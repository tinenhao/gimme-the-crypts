import React, { useState } from 'react'
import {
  makeStyles,
  CardHeader,
  Table,
  Theme,
  Typography,
} from '@material-ui/core'
import DefiTableHeader from '../molecules/DefiTableHeader'
import DefiTableBody from '../molecules/DefiTableBody'
import CardLayout from '../../template/CardLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '60%',
    marginTop: 5,
  },
  table: {
    height: '88%',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '& .MuiTableBody-root .MuiTableRow-root:hover .MuiTableCell-root': {
      backgroundColor: theme.palette.info.main,
      cursor: 'pointer',
    },
  },
  view: {
    marginTop: 5,
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'sticky',
    left: 0,
    '&:hover': {
      color: theme.palette.text.secondary,
    },
  },
}))

function DefiTable() {
  const classes = useStyles()
  const [cols, setCols] = useState<number>(20)

  return (
    <div className={classes.main}>
      <CardLayout>
        <CardHeader
          title="TVL Rankings"
          titleTypographyProps={{
            variant: 'body1',
          }}
        />
        <div className={classes.table}>
          <Table stickyHeader>
            <DefiTableHeader />
            <DefiTableBody cols={cols} />
          </Table>
          <Typography
            className={classes.view}
            align="center"
            onClick={() => setCols(cols + 20)}
          >
            View More
          </Typography>
        </div>
      </CardLayout>
    </div>
  )
}

export default DefiTable
