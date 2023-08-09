import React, { useEffect, useState } from 'react'
import {ContentState, convertFromHTML, convertToRaw, EditorState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import {draftToHTML} from 'draftjs-to-html'

export default function Note() {
    const note = {
        id: '999',
        content: '<p>This is new note</p>'
    }

    const [editorState, setEditorState] = useState(() => {
        return EditorState.createEmpty()
    })

    const [rawHTML, setRawHTML] = useState(note.content)

    useEffect(() => {
        const blocksFromHTML = convertFromHTML(note.content)
    }, [note.id])

    useEffect(() => {
        setRawHTML(note.content)
    }, [note.content])

    const handleOnChange = (e) => {
        setEditorState(e)
        setRawHTML(draftToHTML(convertToRaw(e.getCurrentContent())))
    }

    return (
        <Editor
        editorState={editorState}
        onEditorStateChange={handleOnChange}
        placeholder='Write something...'
        /> 
    )
}

            