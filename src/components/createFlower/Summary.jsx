import { getDatabase } from 'firebase/database'
import React from 'react'
import { app } from '../../configuration'
import { useAuth } from '../../contexts/authContext'

export default function Summary() {
    const {currentUser} = useAuth();
    const db = getDatabase(app)
    const dataref = ref(db, `Bouquets/${Name}/${currentUser}`)
  return (
    <div>Summary</div>
  )
}
