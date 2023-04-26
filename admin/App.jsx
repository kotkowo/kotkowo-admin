import React, { useEffect, useState } from 'react';
import gqlDataProvider from '@/providers/data_provider';
import authProvider from '@/providers/auth_provider';
import { i18nProvider } from '@/providers/i18n_provider';

import {
  Admin,
  List,
  Datagrid,
  TextField,
  Resource,
  Show,
  SimpleShowLayout,
  TextInput,
  ShowButton,
  DeleteButton,
  required,
  SimpleForm,
  Create,
  Edit,
  EditButton,
  SelectInput,
  useTranslate,
  useRecordContext,
  BooleanInput,
  BooleanField,
  ImageInput,
  ImageField,
} from 'react-admin';
import Image from 'next/image';
import Sortable from 'sortablejs';

const TranslatedEnumField = (props) => {
  const { translationRoot = `enums.${props.source}`, source } = props;
  const record = useRecordContext()[source];
  const translate = useTranslate();

  return record ? (
    <span>{translate(`${translationRoot}.${record.toLowerCase()}`)}</span>
  ) : (
    <span></span>
  );
};

const CatList = () => {
  const translate = useTranslate();
  const title = translate('resources.Cat.list');

  return (
    <List title={title}>
      <Datagrid>
        <TextField source="name" />
        <TranslatedEnumField source="sex" />
        <TranslatedEnumField source="age" />
        <TranslatedEnumField source="fivFelvStatus" />
        <TranslatedEnumField source="healthStatus" />
        <BooleanField source="castrated" />
        <ShowButton />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

const CatShow = () => (
  <Show>
    <SimpleShowLayout>
      <ImageField source='images' src="url" title="filename" />
      <TextField source="id" />
      <TextField source="name" />
      <TranslatedEnumField source="sex" />
      <TranslatedEnumField source="age" />
      <TranslatedEnumField source="fivFelvStatus" />
      <TranslatedEnumField source="healthStatus" />
      <BooleanField source="castrated" />
    </SimpleShowLayout>
  </Show>
);

const EditableFields = () => {
  const translate = useTranslate();

  return (
    <>
      <TextInput source="name" validate={[required()]} fullWidth />
      <BooleanInput source="castrated" />
      <SelectInput
        source="healthStatus"
        validate={[required()]}
        choices={[
          { id: 'HEALTHY', name: translate('enums.healthStatus.healthy') },
          { id: 'SICK', name: translate('enums.healthStatus.sick') },
        ]}
      />
      <SelectInput
        source="fivFelvStatus"
        validate={[required()]}
        choices={[
          {
            id: 'BOTH_NEGATIVE',
            name: translate('enums.fivFelvStatus.both_negative'),
          },
          {
            id: 'BOTH_POSITIVE',
            name: translate('enums.fivFelvStatus.both_positive'),
          },
        ]}
      />
      <SelectInput
        source="age"
        validate={[required()]}
        choices={[
          { id: 'JUNIOR', name: translate('enums.age.junior') },
          { id: 'SENIOR', name: translate('enums.age.senior') },
        ]}
      />
      <SelectInput
        source="sex"
        validate={[required()]}
        choices={[
          { id: 'MALE', name: translate('enums.sex.male') },
          { id: 'FEMALE', name: translate('enums.sex.female') },
        ]}
      />
    </>
  );
};

const CatCreate = () => (
  <Create>
    <SimpleForm>
      <EditableFields />
    </SimpleForm>
  </Create>
);

const SortableImageInput = () => {
  const [draggable, setDraggable] = useState(undefined)
  useEffect(() => {
    const dropzoneElem = document.getElementById('dropzone').getElementsByClassName('previews')[0]
    const sortable = Sortable.create(dropzoneElem, {
      draggable: '.previews > *'
    })
    console.log(sortable)
  }, [])

  return (
    <ImageInput id="dropzone" source="images" label="Related pictures" multiple>
      <ImageField className='dz-preview' source='url' title="filename" />
    </ImageInput>
  )
};

const CatEdit = () =>
(
  <Edit>
    <SimpleForm>
      <SortableImageInput />
      <EditableFields />
    </SimpleForm>
  </Edit>
);

const CatIcon = () => (
  <Image src="/catgirl-icon.webp" alt="catgirl" width={32} height={32} />
);

const App = () => (
  <Admin
    dataProvider={gqlDataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
  >
    <Resource
      name="Cat"
      list={CatList}
      show={CatShow}
      create={CatCreate}
      edit={CatEdit}
      icon={CatIcon}
    />
  </Admin>
);

export default App;
