import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import KolamGenerator from '../pages/KolamGenerator'
import KolamAnalysis from '../pages/KolamAnalysis'
import KolamGallery from '../pages/KolamGallery'
import NotFound from '../pages/NotFound'
import About from '../pages/About'
import Error from '../pages/Error'
import PatternRecognition from '../pages/PatternRecognition'
import RedrawKolam from '../pages/RedrawKolam'
import RuleExtraction from '../pages/RuleExtraction'
import RangoliCard from '../components/RangoliCard'
import KolamSketch from '../pages/KolamSketch'

const RoutePage = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/kolam-generator' element={<KolamGenerator />} />
        <Route path='/kolam-analysis' element={<KolamAnalysis />} />
        <Route path='/kolam-gallery' element={<KolamGallery />} />
        <Route path='/about' element={<About />} />
        <Route path='/error' element={<Error />} />
        <Route path='/pattern-recognition' element={<PatternRecognition />} />
        <Route path='/redraw-kolam' element={<RedrawKolam />} />
        <Route path='/rule-extraction' element={<RuleExtraction />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default RoutePage
