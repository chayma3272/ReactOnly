/**
 * LAYOUT: StudentLayout
 * 
 * DESCRIPTION:
 * Layout principal pour toutes les pages de l'interface étudiante.
 * Utilise Outlet de React Router pour afficher les composants enfants.
 */

import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentMenuBar from '../components/StudentMenuBar.jsx'
import StudentHeader from '../components/StudentHeader.jsx'

export default function StudentLayout(){
  return (
    <div className="d-flex">
      {/* Menu latéral fixe */}
      <StudentMenuBar />
      {/* Zone de contenu principal avec marge pour le menu fixe */}
      <div className="flex-grow-1" style={{ marginLeft: '280px' }}>
        <StudentHeader />
        {/* Outlet affiche le composant correspondant à la route actuelle */}
        <main className="p-4" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 70px)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}


