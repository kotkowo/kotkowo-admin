import * as React from 'react';
import gqlDataProvider from '@/providers/data_provider';
import authProvider from '@/providers/auth_provider';

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
} from 'react-admin';
import Image from 'next/image';

const CatList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <TextField source="sex" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const CatShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="sex" />
    </SimpleShowLayout>
  </Show>
);

const EditableFields = () => (
  <>
    <TextInput source="name" validate={[required()]} fullWidth />
    <SelectInput source="sex" validate={[required()]} choices={[
      { id: "MALE", name: "Male" },
      { id: "FEMALE", name: "Female" },
    ]} />
  </>
)

const CatCreate = () => (
  <Create>
    <SimpleForm>
      <EditableFields />
    </SimpleForm>
  </Create>
);

const CatEdit = () => (
  <Edit>
    <SimpleForm>
      <EditableFields />
    </SimpleForm>
  </Edit>
);

const CatIcon = () => (
  <Image src="/catgirl-icon.webp" alt="catgirl" width={32} height={32} />
);

const App = () => (
  <Admin dataProvider={gqlDataProvider} authProvider={authProvider}>
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
