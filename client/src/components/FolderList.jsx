import { Card, CardContent, List, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'

export default function FolderList({folders}) {
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
                    >
                        <Card sx={{mb: '5px'}}>
                            <CardContent sx={{ '&:last-child': {pb: '10px'}, padding: '10px'}}>
                                <Typography>
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
