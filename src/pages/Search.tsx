import { useState, useMemo } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { useDebounce } from '../hooks/useDebounce'
import { Card, CardContent } from '../components/ui/Card'
import { Link } from 'react-router-dom'
import { fishDiseases } from '../data/fishDiseases'
import { shrimpDiseases } from '../data/shrimpDiseases'
import { medicines } from '../data/medicines'

export default function Search() {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'diseases' | 'medicines'>('all')
  const debouncedQuery = useDebounce(query, 300)

  const allDiseases = useMemo(() => [...fishDiseases, ...shrimpDiseases], [])
  
  const filteredDiseases = useMemo(() => {
    if (!debouncedQuery) return []
    const lowerQuery = debouncedQuery.toLowerCase()
    return allDiseases.filter(
      (d) =>
        d.name.toLowerCase().includes(lowerQuery) ||
        d.description.toLowerCase().includes(lowerQuery)
    )
  }, [debouncedQuery, allDiseases])
  
  const filteredMedicines = useMemo(() => {
    if (!debouncedQuery) return []
    const lowerQuery = debouncedQuery.toLowerCase()
    return medicines.filter(
      (m) =>
        m.name.toLowerCase().includes(lowerQuery) ||
        m.description.toLowerCase().includes(lowerQuery)
    )
  }, [debouncedQuery])

  const showDiseases = activeTab === 'all' || activeTab === 'diseases'
  const showMedicines = activeTab === 'all' || activeTab === 'medicines'

  return (
    <div className="container mx-auto px-4 py-4 pb-24 md:pb-8 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Search Input - Prominent at top */}
            <div className="relative mb-6 mt-4">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
              <input
                type="text"
                placeholder="Search diseases, medicines..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-input rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base shadow-elegant transition-all"
              />
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 mb-6">
              {(['all', 'diseases', 'medicines'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

        {/* Results */}
        {!debouncedQuery && (
          <div className="text-center py-12 text-muted-foreground">
            <SearchIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Start typing to search...</p>
          </div>
        )}

        {debouncedQuery && (
          <div className="space-y-6">
            {showDiseases && filteredDiseases.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Diseases</h2>
                <div className="space-y-3">
                      {filteredDiseases.map((disease) => (
                        <Link key={disease.id} to="/manual">
                          <Card className="card-hover">
                            <CardContent className="p-4">
                              <h3 className="font-semibold mb-1">{disease.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {disease.description}
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                </div>
              </div>
            )}

            {showMedicines && filteredMedicines.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Medicines</h2>
                <div className="space-y-3">
                      {filteredMedicines.map((medicine) => (
                        <Link key={medicine.id} to="/medicines">
                          <Card className="card-hover">
                            <CardContent className="p-4">
                              <h3 className="font-semibold mb-1">{medicine.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {medicine.description}
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                </div>
              </div>
            )}

            {debouncedQuery &&
              ((showDiseases && filteredDiseases.length === 0) ||
                (showMedicines && filteredMedicines.length === 0)) && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No results found</p>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  )
}

