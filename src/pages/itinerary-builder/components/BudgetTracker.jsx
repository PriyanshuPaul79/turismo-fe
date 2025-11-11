import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BudgetTracker = ({ itinerary, onUpdateBudget }) => {
  const [budgetLimit, setBudgetLimit] = useState(itinerary?.budget?.limit || 1000);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: 'activities',
    amount: '',
    description: ''
  });

  const expenseCategories = [
    { id: 'accommodation', label: 'Accommodation', icon: 'Bed', color: 'bg-purple-100 text-purple-700' },
    { id: 'transportation', label: 'Transportation', icon: 'Car', color: 'bg-green-100 text-green-700' },
    { id: 'activities', label: 'Activities', icon: 'Activity', color: 'bg-blue-100 text-blue-700' },
    { id: 'food', label: 'Food & Dining', icon: 'Utensils', color: 'bg-orange-100 text-orange-700' },
    { id: 'shopping', label: 'Shopping', icon: 'ShoppingBag', color: 'bg-pink-100 text-pink-700' },
    { id: 'miscellaneous', label: 'Miscellaneous', icon: 'DollarSign', color: 'bg-gray-100 text-gray-700' }
  ];

  const calculateTotalByCategory = () => {
    const totals = {};
    expenseCategories?.forEach(cat => {
      totals[cat.id] = 0;
    });

    // Calculate from activities
    itinerary?.days?.forEach(day => {
      day?.activities?.forEach(activity => {
        if (activity?.cost > 0) {
          const category = getCategoryFromActivityType(activity?.type);
          totals[category] += activity?.cost;
        }
      });
    });

    // Add manual expenses
    if (itinerary?.budget?.expenses) {
      itinerary?.budget?.expenses?.forEach(expense => {
        totals[expense.category] += expense?.amount;
      });
    }

    return totals;
  };

  const getCategoryFromActivityType = (type) => {
    const mapping = {
      'restaurant': 'food',
      'hotel': 'accommodation',
      'transport': 'transportation',
      'attraction': 'activities',
      'activity': 'activities',
      'shopping': 'shopping'
    };
    return mapping?.[type] || 'miscellaneous';
  };

  const getTotalSpent = () => {
    const totals = calculateTotalByCategory();
    return Object.values(totals)?.reduce((sum, amount) => sum + amount, 0);
  };

  const getBudgetPercentage = () => {
    return (getTotalSpent() / budgetLimit) * 100;
  };

  const getRemainingBudget = () => {
    return budgetLimit - getTotalSpent();
  };

  const handleAddExpense = () => {
    if (!newExpense?.amount || !newExpense?.description) return;

    const expense = {
      id: `expense-${Date.now()}`,
      category: newExpense?.category,
      amount: parseFloat(newExpense?.amount),
      description: newExpense?.description,
      date: new Date()?.toISOString()?.split('T')?.[0]
    };

    const updatedBudget = {
      ...itinerary?.budget,
      limit: budgetLimit,
      expenses: [...(itinerary?.budget?.expenses || []), expense]
    };

    onUpdateBudget(updatedBudget);
    setNewExpense({ category: 'activities', amount: '', description: '' });
    setShowAddExpense(false);
  };

  const handleUpdateBudgetLimit = () => {
    const updatedBudget = {
      ...itinerary?.budget,
      limit: budgetLimit,
      expenses: itinerary?.budget?.expenses || []
    };
    onUpdateBudget(updatedBudget);
  };

  const categoryTotals = calculateTotalByCategory();
  const totalSpent = getTotalSpent();
  const budgetPercentage = getBudgetPercentage();
  const remainingBudget = getRemainingBudget();

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Budget Tracker</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddExpense(!showAddExpense)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Expense
          </Button>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">${budgetLimit?.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Budget</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">${totalSpent?.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Spent</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-success' : 'text-destructive'}`}>
              ${Math.abs(remainingBudget)?.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {remainingBudget >= 0 ? 'Remaining' : 'Over Budget'}
            </div>
          </div>
        </div>

        {/* Budget Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Budget Usage</span>
            <span className="text-sm text-muted-foreground">{budgetPercentage?.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                budgetPercentage <= 75 ? 'bg-success' :
                budgetPercentage <= 90 ? 'bg-warning' : 'bg-destructive'
              }`}
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Budget Limit Input */}
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            label="Budget Limit"
            value={budgetLimit}
            onChange={(e) => setBudgetLimit(parseFloat(e?.target?.value) || 0)}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={handleUpdateBudgetLimit}
            className="mt-6"
          >
            Update
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Add Expense Form */}
        {showAddExpense && (
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Add New Expense</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <select
                value={newExpense?.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e?.target?.value })}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                {expenseCategories?.map(cat => (
                  <option key={cat?.id} value={cat?.id}>{cat?.label}</option>
                ))}
              </select>
              <Input
                type="number"
                placeholder="Amount"
                value={newExpense?.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e?.target?.value })}
              />
              <Input
                type="text"
                placeholder="Description"
                value={newExpense?.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e?.target?.value })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleAddExpense}
                disabled={!newExpense?.amount || !newExpense?.description}
              >
                Add Expense
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddExpense(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Expense Breakdown</h4>
          {expenseCategories?.map(category => {
            const amount = categoryTotals?.[category?.id];
            const percentage = totalSpent > 0 ? (amount / totalSpent) * 100 : 0;
            
            return (
              <div key={category?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category?.color}`}>
                    <Icon name={category?.icon} size={20} />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">{category?.label}</h5>
                    <div className="w-32 bg-background rounded-full h-2 mt-1">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">${amount?.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{percentage?.toFixed(1)}%</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Budget Tips */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-900">Budget Tips</h5>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Consider free activities like parks and walking tours</li>
                <li>• Book accommodations and flights early for better rates</li>
                <li>• Set aside 10-15% for unexpected expenses</li>
                <li>• Use public transportation to save on travel costs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;