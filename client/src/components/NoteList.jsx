import React, {useEffect, useState} from 'react'
import { Box, Card, CardContent, Grid, IconButton, List, Tooltip, Typography } from '@mui/material'
import { NoteAddOutlined } from '@mui/icons-material'
import { Link, Outlet, useParams, useLoaderData, useSubmit, useNavigate } from 'react-router-dom'
import moment from 'moment'

export default function NoteList() {
  const { folder } = useLoaderData()
  const {noteId, folderId} = useParams()
  console.log({noteId})
  const [activeNoteId, setActiveNoteId] = useState(noteId)
  const submit = useSubmit()
  const navigate = useNavigate()

  console.log('[Note Lists]', { folder })

  useEffect(() => {
    if(noteId) {
      setActiveNoteId(noteId)
      return
    }

    if (folder?.notes?.[0]) {
      navigate(`note/${folder.notes[0].id}`)
    }
  }, [noteId, folder.notes])

  const handleAddNewNote = () => {
    submit(
      {
        content: '',
        folderId,
      },
      { method: 'post', action: `/folders/${folderId}` }
    )
  }

  return (
    <Grid container height="100%">
      <Grid
        item
        xs={4}
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: '#F0EBE3',
          height: '100%',
          overflowY: 'auto',
          padding: '10px',
          textAlign: 'left'
        }}
      >
        <List
          subheader={
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Notes</Typography>
              <Tooltip title="Add Notes" onClick={handleAddNewNote}>
                <IconButton size='small'>
                  <NoteAddOutlined />
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
            {
              folder.notes.map(({ id, content, updatedAt}) => {
                return (
                  <Link
                      key={id}
                      to={`note/${id}`}
                      style={{ textDecoration: 'none' }}
                      onClick={() => {setActiveNoteId(id)}}
                  >
                      <Card sx={{ mb: '5px',
                        bgcolor: id === activeNoteId ? 'rgb(255 211 140)' : null}}>
                          <CardContent sx={{ '&:last-child': { pb: '10px'}, padding: '10px' }}>
                            <div style={{fontSize: 14, fontWeight: 'bold'}}
                              dangerouslySetInnerHTML={{
                                __html: `${content.substring(0, 30) || 'Empty'}`
                              }}>

                            </div>
                            <Typography sx={{ fontSize: '10px' }}>
                              {moment(updatedAt).format('MMM Do YYY, h:mm:ss a')}
                            </Typography>
                          </CardContent>
                      </Card>
                  </Link>
                )
                
              })
            }
          </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  )
}
