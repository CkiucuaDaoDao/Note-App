import { Card, CardContent, List, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link, useParams } from 'react-router-dom'
import React, { useState } from 'react'

export default function FolderList({folders}) {
    const {folderId} = useParams()
    console.log({folderId})
    const [activeFolderId, setActiveFolderId] = useState(folderId)
  return (
    <List sx={{
        width: '100%',
        bgcolor: '#709D9C',
        height: '100%',
        padding: '10px',
        textAlign: 'left',
        overflowY: 'auto'
    }}
        subheader={
            <Box>
                <Typography sx={{ fontWeight: 'bold', color: 'white'}}>
                    Folders
                </Typography>
            </Box>
        }
    >
        {
            folders.map(({id, name}) => {
                return (
                    <Link
                    key={id}
                    to={`folders/${id}`}
                    style={{ textDecoration: 'none' }}
                    onClick={() => {setActiveFolderId(id)}}
                    >
                        <Card sx={{mb: '5px',
                        backgroundColor: id === activeFolderId ? 'rgb(225 211 140)' : null}}>
                            <CardContent sx={{ '&:last-child': {pb: '10px'}, padding: '10px'}}>
                                <Typography sx={{fontWeight: 'bold', fontSize: '16'}}>
                                   {name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                )
            })
        }
    </List>
  )
}
