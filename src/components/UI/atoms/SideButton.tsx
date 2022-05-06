import React from 'react'
import { makeStyles, Theme, IconButton } from '@material-ui/core'
import {
  GitHub as GitHubIcon,
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material'

interface Prop {
  type: 'email' | 'linkedin' | 'github'
}

interface Pair {
  link: string
  icon: JSX.Element
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '15px',
  },
}))

function SideButton(prop: Prop) {
  const classes = useStyles()
  const dict = {
    email: 'mailto:tinenhao@hotmail.com',
    linkedin: 'https://www.linkedin.com/in/tinenhao/',
    github: 'https://github.com/tinenhao/gimme-the-crypts',
  }

  const pair: Pair =
    prop.type === 'email'
      ? { link: dict.email, icon: <EmailIcon style={{ fill: 'white' }} /> }
      : prop.type === 'github'
      ? { link: dict.github, icon: <GitHubIcon style={{ fill: 'white' }} /> }
      : {
          link: dict.linkedin,
          icon: <LinkedInIcon style={{ fill: 'white' }} />,
        }

  return (
    <div className={classes.main}>
      <IconButton onClick={(e) => (window.open(pair.link), '_blank')}>
        {pair.icon}
      </IconButton>
    </div>
  )
}

export default SideButton
