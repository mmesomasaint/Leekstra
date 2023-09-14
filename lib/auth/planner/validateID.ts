import { redirect } from "next/navigation"
import getPlanner from "./getPlanner"

export default async function validateURL(uid: string, urlid: string) {
  // Get the currenct user
  const planner = await getPlanner(uid)
  console.log("IN the validate fn: ", planner)

  // Check if the current signed in user is the same with url.
  // If not redirect to a view only section of the profile.
  // If not authenticated, ask planner to login
  if (!planner) redirect('/planner/auth/login')
  else if (planner?.urlid !== urlid) redirect(`/profile/${urlid}`)

  return planner
}