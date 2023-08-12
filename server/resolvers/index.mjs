import FakeData from "../FakeData/index.js";

export const resolvers = {
    Query: {
      folders: () => {return FakeData.folders},
      folder: (parent, args) => {
        const folderId = args.folderId
        return FakeData.folders.find(folder => folder.id === folderId)
      },
      note: (parent, args) =>{
        const noteId = args.noteId
        return FakeData.notes. find(note => note.id === noteId)
      }
    },
    Folder: {
      author: (parent, args) => {
        console.log({ parent, args })
        const authorId = parent.authorId
        return FakeData.authors.find(author => author.id === authorId)
      }
    },
    Folder: {
      notes: (parent, args) => {
        console.log({ parent, args })
        return FakeData.notes.filter(note => note.folderId === parent.id)
      }
    }
  };
