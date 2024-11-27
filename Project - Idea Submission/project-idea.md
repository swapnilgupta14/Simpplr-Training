Project Title: Taskify – A Task Manager App for Organizations

Project Description: Idea is to create a web app with clean and polished UI that provides features to users to manage personal and team/project’s tasks, monitor status, all within a user-friendly interface. This project aims to enhance productivity for individuals, teams, and organizations. It also supports multiple organizations/ multiple teams, giving users the flexibility to manage personal to-do tasks as well as diverse team tasks under one account.

Key Features:

  1. Task Management
  •	Create, Assign, and Delegate Tasks: Users can create tasks for themselves (Personal Tasks) or assign them to team members. Tasks can be deleted if no longer needed. Personal tasks are managed separately from team tasks.
  •	Set Priorities, Deadlines, and Dependencies: Tasks can be categorized by priority (e.g., High, Medium, Low) and assigned deadlines or time periods. Dependencies can be set between tasks to ensure proper task sequences.
  •	Track Progress and Status: Tasks are categorized based on their status: Upcoming, Ongoing, Expired, Completed, and Archived.
  •	Task Archiving: Completed or inactive tasks can be archived to keep the active task list clean. Tasks can be archived automatically after their deadline or manually by users.
  •	Drag-and-Drop Functionality: Users can reorder tasks on the dashboard using drag-and-drop, allowing for flexible task management.
  •	Dashboard UI and Calendar View: The dashboard displays tasks over a rolling 3-day window from the current day onward. Users can navigate forward or backward through the days or switch to a calendar view for a broader or past overview of tasks.
  *People above hierarchy can only see/modify tasks which are personal/private to the task creator. Every task is owned by an individual (the assignee). Higher roles (e.g., Project Managers, Team Leads) can only view or manage tasks for users directly below them in the hierarchy.

2. Team Management
  •	Create and Manage Teams: Users (task creators) can form and manage teams within their organizations for collaborative task management. Teams can have multiple team leads, each with defined permissions to oversee tasks and manage the team.
  •	Assign Team Leads and Members: Team leads are responsible for managing tasks and facilitating communication between team members.
  •	Role-based Access Control: Different roles within the team (e.g., Admin, Lead, Member) come with specific permissions, ensuring controlled access to task management, task creation, and other features.

4. Organization Management
  •	Create and Manage Multiple Organizations: Users can manage multiple organizations or groups under one account, allowing flexibility in handling different teams or departments.
  •	Member Management: Easily onboard new users, assign roles, and offboard users when they leave the organization, keeping user membership up to date across all organizations.

6. Authentication, Authorization & User Profile
  •	User Profile Management: Users can manage their profiles, update personal information, change passwords, and view their activity within the app.
  •	Authentication – Signup, Login, Password Change, etc..
  •	Authorization - 
  Role-based access control (RBAC) 
  -	Roles and Permissions
  -	Admin/I (App developer): Full control over the organization, teams, and projects. Can create/delete teams, assign roles, and set permissions.
  -	Organization Admin/Owner: Can manage users and teams 
  -	Project Manager: Can manage projects under their team, assign tasks, monitor progress, and approve/reject team lead actions.
  -	Team Lead: Can create/manage team-specific tasks and oversee team member activities.
  -	Team Member: Assigned specific tasks with limited permissions (e.g., view only assigned tasks and update progress).


More Features -

1.	Activity log/history - based on the user role -> organization, team-owner, manager, members
2.	Allow users or teams to set their working hours, ensuring task deadlines and reminders align with their schedules.
3.	Commenting and Collaboration
    •	Comment/Chat functionality on the task itself
    •	Inline task comments with @mentions, Tag system for tasks (color-coded, searchable)
    •	Ability to tag team members and assign follow-ups directly from comments
    •	Rich text editing for comments
    •	File attachments in comments (images, documents)
    •	Comment threads and nested replies
    •	Maintain an edit history for comments on tasks, showing what was changed and when.
4.	Customizable reminder notifications:
    •	Email notifications
    •	In-app notifications
5.	Snooze and recurring reminder options
    •	Reminder frequency options:
    •	1 day before deadline
    •	3 hours before deadline
    •	Custom time intervals   
6.	Custom Dark/Light mode/ Personal productivity themes
7.	Keyboard shortcuts, custom context menu
8.	Recurring Tasks: Allow users to create recurring tasks with customizable intervals (e.g., daily, weekly, monthly) and optional end dates.
9.	Kanban Board -> "Backlog" "In Progress," and "Done"
10.	Task Approvals Workflow
    •	Enable tasks to go through an approval process before they are marked as completed or moved to the next stage.
    •	Customize approval chains based on roles (e.g., Manager, Team Lead).
11.	Allow users to attach personal/private notes to tasks that only they can see, useful for reminders or drafts.
12.	Predefine task templates for repetitive projects or processes (e.g., "New Employee Onboarding" etc).
13.	Managers/Team leads: 
    •	can see team metrics/performance (other than the user private/personal task)
    •	Visualize team members' task loads and availability in a resource allocation chart.
    •	Show whether assigned team members have viewed task updates, such as new deadlines or added comments.
14.	Enable users to duplicate tasks with all its details (subtasks, dependencies, comments) for similar or recurring tasks.
15.	Allow users to pin important tasks to the top of their dashboard or task list.
16.	Export packing list as PDF/CSV
17.	Bulk import from text/spreadsheet

