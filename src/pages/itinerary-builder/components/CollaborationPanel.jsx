import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const CollaborationPanel = ({ itinerary, onUpdateCollaborators }) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const mockCollaborators = [
  {
    id: 'collab-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: "https://images.unsplash.com/photo-1717329817976-2762c73d38ff",
    avatarAlt: 'Professional headshot of woman with blonde hair in business attire',
    role: 'editor',
    status: 'active',
    joinedAt: '2024-11-01',
    lastActive: '2 hours ago'
  },
  {
    id: 'collab-2',
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    avatar: "https://images.unsplash.com/photo-1713870816826-08e4b536d1ed",
    avatarAlt: 'Professional headshot of Asian man with glasses in casual shirt',
    role: 'viewer',
    status: 'active',
    joinedAt: '2024-11-02',
    lastActive: '1 day ago'
  },
  {
    id: 'collab-3',
    name: 'Emma Davis',
    email: 'emma.davis@email.com',
    avatar: "https://images.unsplash.com/photo-1730222168387-051038de25be",
    avatarAlt: 'Professional headshot of woman with brown hair smiling at camera',
    role: 'editor',
    status: 'pending',
    joinedAt: null,
    lastActive: null
  }];


  const mockComments = [
  {
    id: 'comment-1',
    author: 'Sarah Johnson',
    avatar: "https://images.unsplash.com/photo-1717329817976-2762c73d38ff",
    avatarAlt: 'Professional headshot of woman with blonde hair in business attire',
    content: 'I think we should add more time for the Metropolitan Museum. 3 hours might not be enough to see everything we want.',
    timestamp: '2 hours ago',
    dayIndex: 0,
    activityId: 'act-2',
    replies: [
    {
      id: 'reply-1',
      author: 'You',
      content: 'Good point! I\'ll extend it to 4 hours and adjust the lunch timing.',
      timestamp: '1 hour ago'
    }]

  },
  {
    id: 'comment-2',
    author: 'Mike Chen',
    avatar: "https://images.unsplash.com/photo-1713870816826-08e4b536d1ed",
    avatarAlt: 'Professional headshot of Asian man with glasses in casual shirt',
    content: 'Should we consider booking Broadway show tickets in advance? The popular shows sell out quickly.',
    timestamp: '1 day ago',
    dayIndex: 1,
    activityId: 'act-5',
    replies: []
  }];


  const roleOptions = [
  { value: 'viewer', label: 'Viewer', description: 'Can view the itinerary' },
  { value: 'editor', label: 'Editor', description: 'Can edit and comment' },
  { value: 'admin', label: 'Admin', description: 'Full access including sharing' }];


  const handleInviteCollaborator = () => {
    if (!inviteEmail) return;

    const newCollaborator = {
      id: `collab-${Date.now()}`,
      name: inviteEmail?.split('@')?.[0],
      email: inviteEmail,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
      avatarAlt: 'Professional headshot of new collaborator',
      role: 'viewer',
      status: 'pending',
      joinedAt: null,
      lastActive: null
    };

    onUpdateCollaborators([...mockCollaborators, newCollaborator]);
    setInviteEmail('');
    setShowInviteForm(false);
  };

  const handleRoleChange = (collaboratorId, newRole) => {
    const updatedCollaborators = mockCollaborators?.map((collab) =>
    collab?.id === collaboratorId ? { ...collab, role: newRole } : collab
    );
    onUpdateCollaborators(updatedCollaborators);
  };

  const handleRemoveCollaborator = (collaboratorId) => {
    const updatedCollaborators = mockCollaborators?.filter((collab) => collab?.id !== collaboratorId);
    onUpdateCollaborators(updatedCollaborators);
  };

  const generateShareLink = () => {
    const link = `https://turismo.com/itinerary/${itinerary?.id}/shared?token=abc123xyz`;
    setShareLink(link);
    navigator.clipboard?.writeText(link);
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-700',
      editor: 'bg-blue-100 text-blue-700',
      viewer: 'bg-gray-100 text-gray-700'
    };
    return colors?.[role] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      inactive: 'bg-gray-100 text-gray-700'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Collaboration</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={generateShareLink}
              iconName="Share"
              iconPosition="left">

              Share Link
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowInviteForm(!showInviteForm)}
              iconName="UserPlus"
              iconPosition="left">

              Invite
            </Button>
          </div>
        </div>

        {/* Share Link */}
        {shareLink &&
        <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Shareable Link</p>
                <p className="text-xs text-muted-foreground truncate">{shareLink}</p>
              </div>
              <Button
              variant="ghost"
              size="icon"
              onClick={() => navigator.clipboard?.writeText(shareLink)}>

                <Icon name="Copy" size={16} />
              </Button>
            </div>
          </div>
        }

        {/* Invite Form */}
        {showInviteForm &&
        <div className="mb-4 p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Invite Collaborator</h4>
            <div className="flex items-end space-x-2">
              <Input
              type="email"
              label="Email Address"
              placeholder="Enter email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e?.target?.value)}
              className="flex-1" />

              <Button
              variant="default"
              onClick={handleInviteCollaborator}
              disabled={!inviteEmail}
              className="mb-0">

                Send Invite
              </Button>
            </div>
          </div>
        }
      </div>
      <div className="p-6">
        {/* Collaborators List */}
        <div className="space-y-4 mb-6">
          <h4 className="font-medium text-foreground">Team Members ({mockCollaborators?.length})</h4>
          {mockCollaborators?.map((collaborator) =>
          <div
            key={collaborator?.id}
            className="flex items-center justify-between p-3 bg-muted rounded-lg">

              <div className="flex items-center space-x-3">
                <Image
                src={collaborator?.avatar}
                alt={collaborator?.avatarAlt}
                className="w-10 h-10 rounded-full object-cover" />

                <div>
                  <h5 className="font-medium text-foreground">{collaborator?.name}</h5>
                  <p className="text-sm text-muted-foreground">{collaborator?.email}</p>
                  {collaborator?.lastActive &&
                <p className="text-xs text-muted-foreground">
                      Last active: {collaborator?.lastActive}
                    </p>
                }
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(collaborator?.status)}`}>
                  {collaborator?.status}
                </span>
                <select
                value={collaborator?.role}
                onChange={(e) => handleRoleChange(collaborator?.id, e?.target?.value)}
                className="px-2 py-1 text-xs border border-border rounded bg-background text-foreground">

                  {roleOptions?.map((option) =>
                <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                )}
                </select>
                <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveCollaborator(collaborator?.id)}
                className="text-muted-foreground hover:text-destructive">

                  <Icon name="X" size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Recent Comments */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Recent Comments ({mockComments?.length})</h4>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          
          {mockComments?.map((comment) =>
          <div key={comment?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Image
                src={comment?.avatar}
                alt={comment?.avatarAlt}
                className="w-8 h-8 rounded-full object-cover" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h6 className="font-medium text-foreground">{comment?.author}</h6>
                    <span className="text-xs text-muted-foreground">{comment?.timestamp}</span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      Day {comment?.dayIndex + 1}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-2">{comment?.content}</p>
                  
                  {comment?.replies?.length > 0 &&
                <div className="ml-4 space-y-2">
                      {comment?.replies?.map((reply) =>
                  <div key={reply?.id} className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                            {reply?.author?.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xs font-medium text-foreground">{reply?.author}</span>
                              <span className="text-xs text-muted-foreground">{reply?.timestamp}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{reply?.content}</p>
                          </div>
                        </div>
                  )}
                    </div>
                }
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Icon name="MessageCircle" size={14} className="mr-1" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Icon name="Heart" size={14} className="mr-1" />
                      Like
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Collaboration Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-bold text-primary">{mockCollaborators?.length}</div>
            <div className="text-xs text-muted-foreground">Collaborators</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-bold text-primary">{mockComments?.length}</div>
            <div className="text-xs text-muted-foreground">Comments</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-bold text-primary">
              {mockCollaborators?.filter((c) => c?.status === 'active')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Active Now</div>
          </div>
        </div>
      </div>
    </div>);

};

export default CollaborationPanel;