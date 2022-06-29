import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { makeStyles, Typography, Box } from '@material-ui/core'
import LinkButton from './LinkButton'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    fontSize: 15,
    marginTop: 15,
  },
}))

function ProtocolInformation() {
  const classes = useStyles()
  const defi = useAppSelector((state) => state.defiProtocol).protocol

  return (
    <div className={classes.main}>
      <Typography className={classes.item}>{defi.description}</Typography>
      <Typography className={classes.item}>
        Category: {defi.category}
      </Typography>
      {defi.audits !== '0' && (
        <Box display="flex" marginTop="15px">
          <Typography style={{ marginRight: 10, marginTop: 4 }}>
            Audits:{' '}
          </Typography>
          {defi.audit_links.map((link, index) => {
            return (
              <LinkButton
                key={index + 1}
                text={`Audit #${index}`}
                color={defi.color}
                link={link}
              />
            )
          })}
        </Box>
      )}
      <Box display="flex" marginTop="15px">
        <LinkButton text="Website" link={defi.url} color={defi.color} />
        <LinkButton
          text="Twitter"
          link={`https://twitter.com/${defi.twitter}`}
          color={defi.color}
        />
      </Box>
    </div>
  )
}

export default ProtocolInformation
