import * as React from 'react';
import gqlDataProvider from '@/providers/data_provider';

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
} from 'react-admin';
import Image from 'next/image';

const CatList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
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
    </SimpleShowLayout>
  </Show>
);

const CatCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} fullWidth />
    </SimpleForm>
  </Create>
);

const CatEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} fullWidth />
    </SimpleForm>
  </Edit>
);

const App = () => (
    <Admin dataProvider={gqlDataProvider}>
    <Resource
        name="Cat"
        list={CatList}
        show={CatShow}
        create={CatCreate}
        edit={CatEdit}
        icon={() => (
        <Image
            src="/catgirl-icon.webp"
            alt="catgirl"
            width={32}
            height={32}
        />
        )}
    />
    </Admin>
);

export default App;
