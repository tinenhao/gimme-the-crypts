import React from 'react'
import { makeStyles, Theme, IconButton } from '@material-ui/core'
import {
  GitHub as GitHubIcon,
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material'
import Tooltip from '../../template/Tooltip'

interface Prop {
  type: 'email' | 'linkedin' | 'github'
}

interface Triple {
  link: string
  title: string
  icon: JSX.Element
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '15px',
    '&:hover': {
      transform: 'scale(1.15)',
    },
  },
}))

function SideButton(prop: Prop) {
  const classes = useStyles()
  const dict = {
    emailLink: 'mailto:tinenhao@hotmail.com',
    linkedinLink: 'https://www.linkedin.com/in/tinenhao/',
    githubLink: 'https://github.com/tinenhao/gimme-the-crypts',
    emailTitle: 'Drop me an email',
    linkedinTitle: 'Connect with me',
    githubTitle: 'View Project',
  }

  const triple: Triple =
    prop.type === 'email'
      ? {
          link: dict.emailLink,
          title: dict.emailTitle,
          icon: <EmailIcon style={{ fill: 'white' }} />,
        }
      : prop.type === 'github'
      ? {
          link: dict.githubLink,
          title: dict.githubTitle,
          icon: <GitHubIcon style={{ fill: 'white' }} />,
        }
      : {
          link: dict.linkedinLink,
          title: dict.linkedinTitle,
          icon: <LinkedInIcon style={{ fill: 'white' }} />,
        }

  return (
    <div className={classes.main}>
      <Tooltip title={triple.title}>
        <IconButton onClick={() => (window.open(triple.link), '_blank')}>
          {triple.icon}
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default SideButton
