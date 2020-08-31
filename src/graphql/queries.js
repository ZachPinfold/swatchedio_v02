/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSwatch = /* GraphQL */ `
  query GetSwatch($id: ID!) {
    getSwatch(id: $id) {
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
export const listSwatchs = /* GraphQL */ `
  query ListSwatchs(
    $filter: ModelSwatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSwatchs(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getMasterSwatch = /* GraphQL */ `
  query GetMasterSwatch($id: ID!) {
    getMasterSwatch(id: $id) {
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
export const listMasterSwatchs = /* GraphQL */ `
  query ListMasterSwatchs(
    $filter: ModelMasterSwatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMasterSwatchs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerId
        ownerUsername
        swatches {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
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
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerId
        ownerUsername
        projectTitle
        swatches {
          items {
            hexCode
            id
            order
          }
        }
        order
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getColorHex = /* GraphQL */ `
  query GetColorHex($id: ID!) {
    getColorHex(id: $id) {
      colors
      createdAt
      updatedAt
    }
  }
`;
export const listColorHexs = /* GraphQL */ `
  query ListColorHexs($format: String!) {
    listColorHexs(format: $format)
  }
`;
export const getColorHexDiscover = /* GraphQL */ `
  query GetColorHexDiscover($id: ID!) {
    getColorHexDiscover(id: $id) {
      colors
      createdAt
      updatedAt
    }
  }
`;

export const listColorHexDiscovers = /* GraphQL */ `
  query ListColorHexDiscovers($hueOption: String, $format: String!) {
    listColorHexDiscovers(hueOption: $hueOption, format: $format)
  }
`;
