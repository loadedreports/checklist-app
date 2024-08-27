import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Checklist from './components/home/Checklist[Id]'
import Home from './components/home/Home'
import Team from './components/team/Team'
import TeamMember from './components/team/TeamMember[Id]'
import PendingRuns from './components/pending/Pending'
import CompletedRuns from './components/completed/Completed'

import useAppNavigation from "./hooks/useAppNavigation.tsx"

export default function AppRoutes() {

  const HomeWithNavigation = useAppNavigation(Home)
  const TeamWithNavigation = useAppNavigation(Team)
  const ChecklistWithNavigation = useAppNavigation(Checklist)
  const TeamMemberWithNavigation = useAppNavigation(TeamMember)
  const PendingRunsWithNavigation = useAppNavigation(PendingRuns)
  const CompletedRunsWithNavigation = useAppNavigation(CompletedRuns)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeWithNavigation />} />
        <Route path="/checklist/:id" element={<ChecklistWithNavigation />} />
        <Route path="/team" element={<TeamWithNavigation />} />
        <Route path="/team/:id" element={<TeamMemberWithNavigation />} />
        <Route path="/pending" element={<PendingRunsWithNavigation />} />
        <Route path="/completed" element={<CompletedRunsWithNavigation />} />
      </Routes>
    </Router>
  )
}