export const typeDefs = `#graphql
type Folder {
  id: String,
  name: String,
  createdAt: String,
  author: Author,
  notes: [Note]
}

type Author{
  id: String,
  name: String
}

type Note{
  id: String,
  content: String
}

type Query {
  folders: [Folder]
  folder(folderId: String): Folder,
  note(noteId: String): Note
}
`;