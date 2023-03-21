import * as React from 'react';
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
} from 'react-admin';
import Image from 'next/image';

const SexField = (props) => {
  const record = useRecordContext(props);
  const translate = useTranslate();
  const translatedSex = translate(`enums.sex.${record.sex.toLowerCase()}`)

  return record ? <span>{translatedSex}</span> : null
}

const CatList = () => {
  const translate = useTranslate()
  const title = translate('resources.Cat.list')

  return (
    <List title={title}>
      <Datagrid>
        <TextField source="name" />
        <SexField source="sex" />
        <ShowButton />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}

const CatShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <SexField source="sex" />
    </SimpleShowLayout>
  </Show>
);

const EditableFields = () => {
  const translate = useTranslate();

  return (
    <>
      <TextInput source="name" validate={[required()]} fullWidth />
      <SelectInput source="sex" validate={[required()]} choices={[
        { id: "MALE", name: translate("enums.sex.male") },
        { id: "FEMALE", name: translate("enums.sex.female") },
      ]} />
    </>
  )
}

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
  <Admin dataProvider={gqlDataProvider} authProvider={authProvider} i18nProvider={i18nProvider}>
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
