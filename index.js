import { gql, ApolloServer } from 'apollo-server'

const persons = [
	{
		name: 'Miguel',
		phone: '123123123',
		street: 'calle frontend',
		city: 'Santiago',
		age: '23',
		id: 'fasdfasdfasdfasdfasdf'
	},
	{
		name: 'Angel',
		phone: '24232545423123',
		street: 'calle backend',
		id: 'qweqweqweqweqweqwe'
	},
	{
		name: 'Alonso',
		phone: '930941231',
		street: 'calle fullstack',
		city: 'Lima',
		id: 'cvzxcvzxcvzxcvzxcvzxcvzxcv'
	}
]

const typeDefinitions = gql`
	type Address {
		street: String!
		city: String!
	}

	type Person {
		name: String!
		phone: String
		street: String!
		canDrink: Boolean!
		address: Address!
		id: ID!
	}

	type Query {
		personCount: Int!
		allPersons: [Person]!
		findPerson(name: String!): Person
	}
`
// La información en la base de datos se transforma a lo que necesitemos
const resolvers = {
	Query: {
		personCount: () => persons.length,
		allPersons: () => persons,
		findPerson: (root, args) => {
			const {name} = args
			return persons.find(person => person.name === name) || {}
		}
	},
	Person: {
		address: (root) => {
			return {
				street: root.street,
				city: root.city
			}
		},
		canDrink: (root) => root.age > 18
	}
}

// Siempre se tienen que llamar así
const server = new ApolloServer({
	typeDefs: typeDefinitions,
	resolvers
})

server.listen().then(({url}) => {
	console.log(`Server ready at ${url}`)
})


