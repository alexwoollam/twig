const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    password:  String
  }
  
  type Plant {
    id: ID!
    synonyms: [Synonym]
    isSynonym: Boolean
    synonymParentPlantId: ID
    synonymParentPlantName: String
    autoCompleteField: String
    autoCompleteFieldList: [String]
    botanicalName: String
    botanicalNameUnFormatted: String
    family: String
    genus: String
    entityDescription: String
    genusDescription: String
    price: Float
    plantType: [PlantType]
    foliage: [RefType]
    notedForFragrance: Boolean
    fragrance: String
    isNative: Boolean
    habit: [RefType]
    images: [Image]
    imageCopyRight: String
    commonName: String
    commonNameSortField: String
    commonNames: [String]
    nurseriesCount: Int
    isAgm: Boolean
    isGenus: Boolean
    isSpecie: Boolean
    isPlantsForPollinators: Boolean
    hardinessLevel: Int
    sunlight: [RefType]
    soilType: [Int]
    spreadType: [Int]
    heightType: [Int]
    spread: String
    height: String
    timeToFullHeight: [Int]
    aspect: [RefType]
    moisture: [RefType]
    ph: [RefType]
    suggestedPlantUses: [Int]
    plantingPlaces: [Int]
    exposure: [RefType]
    cultivation: String
    pestResistance: String
    diseaseResistance: String
    pruning: String
    propagation: String
    isLowMaintenance: Boolean
    isDroughtResistance: Boolean
    supplierURL: String
    hortGroupDescription: String
    range: String
    toxicity: String
    seasonOfInterest: [Int]
    colorWithAttributes: [ColourWithAttribute]
    nameStatus: String
    hasFullProfile: Boolean
    seasonColourAgg: [Int]
    plantEntityId: String
  }
  
  type PlantType {
    id: ID!
    name: String
    oldId: Int
  }
  
  type RefType {
    id: ID!
    name: String
    oldId: Int
  }

  type Synonym {
    id: ID!
    name: String
  }

  type Image {
    image: String
    copyRight: String
  }

  type ColourWithAttribute {
    season: Int
    colour: Int
    attributeType: Int
  }
  
  type UserResponse {
    email: String
    firstName:String
    lastName: String
  }
  
  type LoginResponse {
    userId: String,
    token: String,
    tokenExpiration: Int
  }
  
  type Category {
    name: String
    image: String
    uri: String
    description: String
  }
  
  type TokenResponse {
    valid: Boolean 
  }

  type Mutation {
    addUser(firstName:String!, lastName: String!, email: String!, password: String!): User
  }
   
  type Query {
    login(email: String!, password: String!): LoginResponse
    token(token: String!): TokenResponse
    user: UserResponse
    categories(limit: Int, search: String): [Category]
    plant(
        name: String,
        type: Int,
        limit: Int, 
        page: Int, 
        skip: Boolean,
        edible: Boolean
        ): [Plant]
  }
`);

module.exports = schema;