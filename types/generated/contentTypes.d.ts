import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdoptedCatAdoptedCat extends Schema.CollectionType {
  collectionName: 'adopted_cats';
  info: {
    singularName: 'adopted-cat';
    pluralName: 'adopted-cats';
    displayName: 'AdoptedCat';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    adoption_date: Attribute.DateTime & Attribute.Required;
    cat: Attribute.Relation<
      'api::adopted-cat.adopted-cat',
      'oneToOne',
      'api::cat.cat'
    >;
    caretaker: Attribute.Relation<
      'api::adopted-cat.adopted-cat',
      'oneToOne',
      'api::contact-information.contact-information'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::adopted-cat.adopted-cat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::adopted-cat.adopted-cat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdviceAdvice extends Schema.CollectionType {
  collectionName: 'advices';
  info: {
    singularName: 'advice';
    pluralName: 'advices';
    displayName: 'Advice';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    tags: Attribute.Relation<
      'api::advice.advice',
      'oneToMany',
      'api::announcement-tag.announcement-tag'
    >;
    article: Attribute.Relation<
      'api::advice.advice',
      'oneToOne',
      'api::article.article'
    >;
    image: Attribute.Media & Attribute.Required;
    views: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::advice.advice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::advice.advice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAnnouncementAnnouncement extends Schema.CollectionType {
  collectionName: 'announcements';
  info: {
    singularName: 'announcement';
    pluralName: 'announcements';
    displayName: 'Announcement';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    announcement_tags: Attribute.Relation<
      'api::announcement.announcement',
      'oneToMany',
      'api::announcement-tag.announcement-tag'
    >;
    article: Attribute.Relation<
      'api::announcement.announcement',
      'oneToOne',
      'api::article.article'
    >;
    views: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::announcement.announcement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::announcement.announcement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAnnouncementTagAnnouncementTag
  extends Schema.CollectionType {
  collectionName: 'announcement_tags';
  info: {
    singularName: 'announcement-tag';
    pluralName: 'announcement-tags';
    displayName: 'AnnouncementTag';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::announcement-tag.announcement-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::announcement-tag.announcement-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Introduction: Attribute.Text & Attribute.Required;
    announcement: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'api::announcement.announcement'
    >;
    image: Attribute.Media & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
    advice: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'api::advice.advice'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCatCat extends Schema.CollectionType {
  collectionName: 'cats';
  info: {
    singularName: 'cat';
    pluralName: 'cats';
    displayName: 'Cat';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    slug: Attribute.UID<'api::cat.cat', 'name'> & Attribute.Required;
    images: Attribute.Relation<'api::cat.cat', 'oneToMany', 'api::image.image'>;
    description_heading: Attribute.String;
    description: Attribute.Text;
    sex: Attribute.Enumeration<['Male', 'Female']> & Attribute.Required;
    age: Attribute.Enumeration<['Junior', 'Adult', 'Senior']>;
    medical_status: Attribute.Enumeration<['TestedAndVaccinated']>;
    fiv_felv: Attribute.Enumeration<['Negative', 'Positive']>;
    castrated: Attribute.Boolean & Attribute.DefaultTo<true>;
    healthy: Attribute.Boolean & Attribute.DefaultTo<true>;
    cat_tags: Attribute.Relation<
      'api::cat.cat',
      'oneToMany',
      'api::cat-tag.cat-tag'
    >;
    color: Attribute.Enumeration<
      ['Black', 'Gray', 'Tricolor', 'Patched', 'Ginger', 'OtherColor']
    > &
      Attribute.Required;
    is_dead: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    contact_informations: Attribute.Relation<
      'api::cat.cat',
      'oneToMany',
      'api::contact-information.contact-information'
    >;
    chip_number: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::cat.cat', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::cat.cat', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiCatTagCatTag extends Schema.CollectionType {
  collectionName: 'cat_tags';
  info: {
    singularName: 'cat-tag';
    pluralName: 'cat-tags';
    displayName: 'CatTag';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    text: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        maxLength: 32;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cat-tag.cat-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cat-tag.cat-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactInformationContactInformation
  extends Schema.CollectionType {
  collectionName: 'contact_informations';
  info: {
    singularName: 'contact-information';
    pluralName: 'contact-informations';
    displayName: 'ContactInformation';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    phone_number: Attribute.String & Attribute.Required;
    first_name: Attribute.String & Attribute.Required;
    last_name: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-information.contact-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-information.contact-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiExternalMediaExternalMedia extends Schema.CollectionType {
  collectionName: 'external_medias';
  info: {
    singularName: 'external-media';
    pluralName: 'external-medias';
    displayName: 'ExternalMedia';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    tags: Attribute.Relation<
      'api::external-media.external-media',
      'oneToMany',
      'api::announcement-tag.announcement-tag'
    >;
    media_url: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::external-media.external-media',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::external-media.external-media',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFoundCatFoundCat extends Schema.CollectionType {
  collectionName: 'found_cats';
  info: {
    singularName: 'found-cat';
    pluralName: 'found-cats';
    displayName: 'FoundCat';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    found_location: Attribute.String & Attribute.Required;
    special_signs: Attribute.String;
    found_datetime: Attribute.DateTime & Attribute.Required;
    cat: Attribute.Relation<
      'api::found-cat.found-cat',
      'oneToOne',
      'api::cat.cat'
    >;
    discovery_circumstances: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::found-cat.found-cat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::found-cat.found-cat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiImageImage extends Schema.CollectionType {
  collectionName: 'images';
  info: {
    singularName: 'image';
    pluralName: 'images';
    displayName: 'Image';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique;
    image: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::image.image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::image.image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLastViewPullLastViewPull extends Schema.SingleType {
  collectionName: 'last_view_pulls';
  info: {
    singularName: 'last-view-pull';
    pluralName: 'last-view-pulls';
    displayName: 'LastViewPull';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    pull_date: Attribute.DateTime &
      Attribute.Required &
      Attribute.DefaultTo<'2025-04-01T22:00:00.000Z'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::last-view-pull.last-view-pull',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::last-view-pull.last-view-pull',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLookingForAdoptionCatLookingForAdoptionCat
  extends Schema.CollectionType {
  collectionName: 'looking_for_adoption_cats';
  info: {
    singularName: 'looking-for-adoption-cat';
    pluralName: 'looking-for-adoption-cats';
    displayName: 'LookingForAdoptionCat';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    cat: Attribute.Relation<
      'api::looking-for-adoption-cat.looking-for-adoption-cat',
      'oneToOne',
      'api::cat.cat'
    >;
    owned_by_kotkowo: Attribute.Boolean & Attribute.Required;
    caretaker: Attribute.Relation<
      'api::looking-for-adoption-cat.looking-for-adoption-cat',
      'oneToOne',
      'api::contact-information.contact-information'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::looking-for-adoption-cat.looking-for-adoption-cat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::looking-for-adoption-cat.looking-for-adoption-cat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLostCatLostCat extends Schema.CollectionType {
  collectionName: 'lost_cats';
  info: {
    singularName: 'lost-cat';
    pluralName: 'lost-cats';
    displayName: 'LostCat';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    disappearance_location: Attribute.String & Attribute.Required;
    special_signs: Attribute.String;
    during_medical_treatment: Attribute.Boolean & Attribute.Required;
    disappearance_datetime: Attribute.DateTime & Attribute.Required;
    cat: Attribute.Relation<
      'api::lost-cat.lost-cat',
      'oneToOne',
      'api::cat.cat'
    >;
    disappearance_circumstances: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::lost-cat.lost-cat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::lost-cat.lost-cat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupporterSupporter extends Schema.CollectionType {
  collectionName: 'supporters';
  info: {
    singularName: 'supporter';
    pluralName: 'supporters';
    displayName: 'supporter';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contact_information: Attribute.Relation<
      'api::supporter.supporter',
      'oneToOne',
      'api::contact-information.contact-information'
    >;
    virtual_cats: Attribute.Relation<
      'api::supporter.supporter',
      'manyToMany',
      'api::virtual-cat.virtual-cat'
    >;
    portrait: Attribute.Relation<
      'api::supporter.supporter',
      'oneToOne',
      'api::image.image'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::supporter.supporter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::supporter.supporter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVirtualCatVirtualCat extends Schema.CollectionType {
  collectionName: 'virtual_cats';
  info: {
    singularName: 'virtual-cat';
    pluralName: 'virtual-cats';
    displayName: 'VirtualCat';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    cat: Attribute.Relation<
      'api::virtual-cat.virtual-cat',
      'oneToOne',
      'api::cat.cat'
    >;
    supporters: Attribute.Relation<
      'api::virtual-cat.virtual-cat',
      'manyToMany',
      'api::supporter.supporter'
    >;
    caretaker: Attribute.Relation<
      'api::virtual-cat.virtual-cat',
      'oneToOne',
      'api::contact-information.contact-information'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::virtual-cat.virtual-cat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::virtual-cat.virtual-cat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::adopted-cat.adopted-cat': ApiAdoptedCatAdoptedCat;
      'api::advice.advice': ApiAdviceAdvice;
      'api::announcement.announcement': ApiAnnouncementAnnouncement;
      'api::announcement-tag.announcement-tag': ApiAnnouncementTagAnnouncementTag;
      'api::article.article': ApiArticleArticle;
      'api::cat.cat': ApiCatCat;
      'api::cat-tag.cat-tag': ApiCatTagCatTag;
      'api::contact-information.contact-information': ApiContactInformationContactInformation;
      'api::external-media.external-media': ApiExternalMediaExternalMedia;
      'api::found-cat.found-cat': ApiFoundCatFoundCat;
      'api::image.image': ApiImageImage;
      'api::last-view-pull.last-view-pull': ApiLastViewPullLastViewPull;
      'api::looking-for-adoption-cat.looking-for-adoption-cat': ApiLookingForAdoptionCatLookingForAdoptionCat;
      'api::lost-cat.lost-cat': ApiLostCatLostCat;
      'api::supporter.supporter': ApiSupporterSupporter;
      'api::virtual-cat.virtual-cat': ApiVirtualCatVirtualCat;
    }
  }
}
