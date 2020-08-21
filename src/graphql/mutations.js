/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSwatch = /* GraphQL */ `
  mutation CreateSwatch(
    $input: CreateSwatchInput!
    $condition: ModelSwatchConditionInput
  ) {
    createSwatch(input: $input, condition: $condition) {
      id
      ownerId
      ownerUsername
      hexCode
      createdAt
      updatedAt
    }
  }
`;
export const updateSwatch = /* GraphQL */ `
  mutation UpdateSwatch(
    $input: UpdateSwatchInput!
    $condition: ModelSwatchConditionInput
  ) {
    updateSwatch(input: $input, condition: $condition) {
      id
      ownerId
      ownerUsername
      hexCode
      createdAt
      updatedAt
    }
  }
`;
export const deleteSwatch = /* GraphQL */ `
  mutation DeleteSwatch(
    $input: DeleteSwatchInput!
    $condition: ModelSwatchConditionInput
  ) {
    deleteSwatch(input: $input, condition: $condition) {
      id
      ownerId
      ownerUsername
      hexCode
      createdAt
      updatedAt
    }
  }
`;
export const createMasterSwatch = /* GraphQL */ `
  mutation CreateMasterSwatch(
    $input: CreateMasterSwatchInput!
    $condition: ModelMasterSwatchConditionInput
  ) {
    createMasterSwatch(input: $input, condition: $condition) {
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
export const updateMasterSwatch = /* GraphQL */ `
  mutation UpdateMasterSwatch(
    $input: UpdateMasterSwatchInput!
    $condition: ModelMasterSwatchConditionInput
  ) {
    updateMasterSwatch(input: $input, condition: $condition) {
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
export const deleteMasterSwatch = /* GraphQL */ `
  mutation DeleteMasterSwatch(
    $input: DeleteMasterSwatchInput!
    $condition: ModelMasterSwatchConditionInput
  ) {
    deleteMasterSwatch(input: $input, condition: $condition) {
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
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
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
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
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
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
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
