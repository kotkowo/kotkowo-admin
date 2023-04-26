import type { ApolloClient } from "@apollo/client";
import { gql } from "@apollo/client";
import axios from "axios";
import { Identifier, UpdateParams } from "react-admin";

export type ImagePreUploadMetadata = {
  id?: string;
  filename?: string;
}

export type ImageUploadMetadata = {
  id: string;
  filename: string;
  uploadUrl: string;
  url: string;
  __typename: string;
}

export const isImageUploadMetadata = (x: any): x is ImageUpload => ["__typename", "url", "uploadUrl", "filename"].reduce((acc, field) => acc && field in x, true);

export type ImageUpload = {
  title: string;
  rawFile: File;
  src: string;
}

export const isImageUpload = (x: any): x is ImageUpload => ["title", "rawFile", "src"].reduce((acc, field) => acc && field in x, true);

export type UpdateParamsWithImages = UpdateParams & {
  data: {
    images: [ImageUpload | ImageUploadMetadata]
  }
}

const imageFetchUploadMetadata = async (client: ApolloClient<any>, resourceType: string, resourceId: Identifier, preUploadMetadata: ImagePreUploadMetadata[]): Promise<ImageUploadMetadata[]> => {
  const imageUploadMethod = `setImages${resourceType}`;
  const images = preUploadMetadata.map(metadata => JSON.stringify({ filename: metadata.filename, id: metadata.id }))

  return (await client.mutate({
    mutation: gql`
          mutation ($id: ID, $input: SetImages${resourceType}Input) {
            ${imageUploadMethod}(id: $id, input: $input) {
              result {
                images {
                  id
                  filename
                  uploadUrl
                  url
                }
              }
            }
          }
        `,
    variables: {
      input: { images },
      id: resourceId,
    },
  })).data?.[imageUploadMethod].result?.images;
};

export const uploadImages = async (client: ApolloClient<any>, resourceType: string, resourceId: Identifier, params: UpdateParamsWithImages) => {
  const preUploadMetadata = params.data.images.map((meta) => {
    if (isImageUpload(meta)) {
      return { filename: meta.title } as ImagePreUploadMetadata
    } else if (isImageUploadMetadata(meta)) {
      return { id: meta.id } as ImagePreUploadMetadata
    }
    throw new Error("Expected an ImageUpload or ImageUploadMetadata")
  });

  const newUploads = params.data.images.filter((meta) => isImageUpload(meta)) as ImageUpload[];
  const uploadMetadata = await imageFetchUploadMetadata(client, resourceType, resourceId, preUploadMetadata)
  return Promise.all(newUploads.map(async (upload) => {
    const uploadMeta = uploadMetadata.find((meta) => meta.filename === upload.title)
    if (uploadMeta === undefined) {
      return Promise.reject(new Error(`Couldn't find matching upload meta for file ${upload.title}`))
    }
    return await axios.put(uploadMeta.uploadUrl, upload.rawFile, { headers: { 'Content-Type': 'multipart/form-data' } })
  }))
};
