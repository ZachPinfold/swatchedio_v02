/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSwatch = /* GraphQL */ `
  subscription OnCreateSwatch {
    onCreateSwatch {
      id
      ownerId
      ownerUsername
      hexCode
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSwatch = /* GraphQL */ `
  subscription OnUpdateSwatch {
    onUpdateSwatch {
      id
      ownerId
      ownerUsername
      hexCode
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSwatch = /* GraphQL */ `
  subscription OnDeleteSwatch {
    onDeleteSwatch {
      id
      ownerId
      ownerUsername
      hexCode
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMasterSwatch = /* GraphQL */ `
  subscription OnCreateMasterSwatch {
    onCreateMasterSwatch {
      id
      ownerId
      ownerUsername
      swatches {
        items {
          id
          ownerId
          ownerUsername
          hexCode
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMasterSwatch = /* GraphQL */ `
  subscription OnUpdateMasterSwatch {
    onUpdateMasterSwatch {
      id
      ownerId
      ownerUsername
      swatches {
        items {
          id
          ownerId
          ownerUsername
          hexCode
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMasterSwatch = /* GraphQL */ `
  subscription OnDeleteMasterSwatch {
    onDeleteMasterSwatch {
      id
      ownerId
      ownerUsername
      swatches {
        items {
          id
          ownerId
          ownerUsername
          hexCode
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
      id
      ownerId
      ownerUsername
      projectTitle
      swatches {
        items {
          id
          ownerId
          ownerUsername
          hexCode
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject {
    onUpdateProject {
      id
      ownerId
      ownerUsername
      projectTitle
      swatches {
        items {
          id
          ownerId
          ownerUsername
          hexCode
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject {
    onDeleteProject {
      id
      ownerId
      ownerUsername
      projectTitle
      swatches {
        items {
          id
          ownerId
          ownerUsername
          hexCode
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
