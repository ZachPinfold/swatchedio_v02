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
      order
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
      order
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
      order
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
          order
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
          order
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
          order
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
          order
          createdAt
          updatedAt
        }
        nextToken
      }
      order
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
          order
          createdAt
          updatedAt
        }
        nextToken
      }
      order
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
          order
          createdAt
          updatedAt
        }
        nextToken
      }
      order
      createdAt
      updatedAt
    }
  }
`;
export const createColorHex = /* GraphQL */ `
  mutation CreateColorHex(
    $input: CreateColorHexInput!
    $condition: ModelColorHexConditionInput
  ) {
    createColorHex(input: $input, condition: $condition) {
      colors
      createdAt
      updatedAt
    }
  }
`;
export const updateColorHex = /* GraphQL */ `
  mutation UpdateColorHex(
    $input: UpdateColorHexInput!
    $condition: ModelColorHexConditionInput
  ) {
    updateColorHex(input: $input, condition: $condition) {
      colors
      createdAt
      updatedAt
    }
  }
`;
export const deleteColorHex = /* GraphQL */ `
  mutation DeleteColorHex(
    $input: DeleteColorHexInput!
    $condition: ModelColorHexConditionInput
  ) {
    deleteColorHex(input: $input, condition: $condition) {
      colors
      createdAt
      updatedAt
    }
  }
`;
export const createColorHexDiscover = /* GraphQL */ `
  mutation CreateColorHexDiscover(
    $input: CreateColorHexDiscoverInput!
    $condition: ModelColorHexDiscoverConditionInput
  ) {
    createColorHexDiscover(input: $input, condition: $condition) {
      colors
      createdAt
      updatedAt
    }
  }
`;
export const updateColorHexDiscover = /* GraphQL */ `
  mutation UpdateColorHexDiscover(
    $input: UpdateColorHexDiscoverInput!
    $condition: ModelColorHexDiscoverConditionInput
  ) {
    updateColorHexDiscover(input: $input, condition: $condition) {
      colors
      createdAt
      updatedAt
    }
  }
`;
export const deleteColorHexDiscover = /* GraphQL */ `
  mutation DeleteColorHexDiscover(
    $input: DeleteColorHexDiscoverInput!
    $condition: ModelColorHexDiscoverConditionInput
  ) {
    deleteColorHexDiscover(input: $input, condition: $condition) {
      colors
      createdAt
      updatedAt
    }
  }
`;
