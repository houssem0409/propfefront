// ** MUI Imports
import Grid from '@mui/material/Grid'
import Layout from '../../components/Layout'
import Link from 'next/link'
import axios from 'axios'
// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from '../../components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from '../../styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from '../../views/dashboard/Table'
import Trophy from '../../views/dashboard/Trophy'
import TotalEarning from '../../views/dashboard/TotalEarning'
import StatisticsCard from '../../views/dashboard/StatisticsCard'
import WeeklyOverview from '../../views/dashboard/WeeklyOverview'
import DepositWithdraw from '../../views/dashboard/DepositWithdraw'
import SalesByCountries from '../../views/dashboard/SalesByCountries'

import { getUsers } from '../api/admin'
import { useEffect, useState, useContext } from 'react'
import AdminLinks from '../../components/AdminLinks'
import { UserContext } from '../../components/UserContext'
import Authorization from '../../components/Authorization'

const Dashboard = () => {
  const { user, setTokens, tokens, token, mystartupManage } =
    useContext(UserContext)
  const [users, setUsers] = useState()

  const dashBoard = () => (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>

        <Grid item xs={12} md={8}>
          <SalesByCountries />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )

  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await axios.get('http://localhost:8000/api/users')
        setUsers(data)
        console.log(data)

        return data
      } catch (error) {
        console.error(error)
      }
    }
  }, [])

  return (
    <Layout>
      <div className='row'>
        <div className='col-3'>
          <AdminLinks />
        </div>
        <div className='col-9'>{dashBoard()}</div>
        <div className='col-9'></div>
      </div>
      <div style={{ margin: '20px', padding: '10px' }}></div>
    </Layout>
  )
}

export default Authorization(Dashboard, ['admin'])
