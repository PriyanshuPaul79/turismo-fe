import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import DestinationCard from './DestinationCard';

const SearchResults = ({ 
  results, 
  loading, 
  totalResults, 
  currentPage, 
  onPageChange, 
  onSortChange, 
  sortBy,
  onSaveDestination,
  onCompareDestination,
  onViewDestination,
  savedDestinations,
  compareList
}) => {
  const [viewMode, setViewMode] = useState('grid');

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'distance', label: 'Distance' }
  ];

  const resultsPerPage = 12;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleViewDestination = (destination) => {
    // Navigate to destination detail page
    window.location.href = `/destination-detail?id=${destination?.id}`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="text-muted-foreground">Searching destinations...</span>
          </div>
        </div>
      </div>
    );
  }

  if (results?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No destinations found</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Try adjusting your search criteria or filters to find more destinations that match your preferences.
        </p>
        <Button variant="outline" onClick={() => window.location?.reload()}>
          <Icon name="RotateCcw" size={18} className="mr-2" />
          Reset Search
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-foreground">
            {totalResults?.toLocaleString()} destinations found
          </h2>
          
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-md p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="Grid View"
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="List View"
            >
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-3">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            className="w-48"
          />
        </div>
      </div>
      {/* Compare Bar */}
      {compareList?.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="GitCompare" size={20} className="text-primary" />
              <span className="font-medium text-foreground">
                {compareList?.length} destination{compareList?.length !== 1 ? 's' : ''} selected for comparison
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCompareDestination(null, 'clear')}
              >
                Clear All
              </Button>
              <Button
                variant="default"
                size="sm"
                disabled={compareList?.length < 2}
                className="bg-primary hover:bg-primary/90"
              >
                Compare ({compareList?.length})
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Results Grid/List */}
      <div className={
        viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4'
      }>
        {results?.map((destination) => (
          <DestinationCard
            key={destination?.id}
            destination={destination}
            onSave={onSaveDestination}
            onCompare={onCompareDestination}
            onViewDetails={handleViewDestination}
            isSaved={savedDestinations?.includes(destination?.id)}
            isComparing={compareList?.some(item => item?.id === destination?.id)}
          />
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Icon name="ChevronLeft" size={16} className="mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  className="w-10"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </Button>
        </div>
      )}
      {/* Results Info */}
      <div className="text-center text-sm text-muted-foreground">
        Showing {((currentPage - 1) * resultsPerPage) + 1} to {Math.min(currentPage * resultsPerPage, totalResults)} of {totalResults?.toLocaleString()} results
      </div>
    </div>
  );
};

export default SearchResults;