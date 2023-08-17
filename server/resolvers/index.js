import FakeData from "../FakeData/index.js";
import FolderModel from "../models/FolderModel.js"
import AuthorModel from "../models/AuthorModel.js";

export const resolvers = {
    Query: {
      folders: async (parent, args, context) => {
        const folders = await FolderModel.find({
          authorId: context.uid
        })
        console.log({folders, context})
        return folders
      },        
      folder: async (parent, args) => {
        const folderId = args.folderId
        console.log({ folderId })
        const foundFolder = await FolderModel.findOne({
          _id: folderId
        })
        return foundFolder
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
      },
      notes: (parent, args) => {
        console.log({ parent, args })
        return FakeData.notes.filter(note => note.folderId === parent.id)
      }
    },
    Mutation: {
      addFolder: async (params, args) => {
        const newFolder = new FolderModel({...args, authorId: '123'})
        console.log({newFolder})
        await newFolder.save()
        return newFolder
      },
      register: async (params, args) => {
        const foundUser = await AuthorModel.findOne({ uid: args.uid })
        if (!foundUser) {
          const newUser = new AuthorModel(args)
          await newUser.save()
          return newUser
        }
        return foundUser
      }
    }
  }

    