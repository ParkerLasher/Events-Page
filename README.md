# Events-Page
# Event Sign-Up Functionality
- Users can sign up for a variety of events such as Charity Runs, Financial Aid Workshops, TedX Talks, Job Fairs, Bake Sales, and Raffles.
- Each event has its own dedicated sign-up page with relevant information and a sign-up form.
# Mobile Navigation Menu
- A responsive hamburger menu for easy navigation on mobile devices.
- A horizontal navigation bar for desktop view, allowing quick access to different event pages.
# Dynamic Event Cards on Homepage
- A visually appealing layout of event cards on the homepage, each with an image, title, date, and a sign-up button linking to the respective event's page.
- Provides users with a quick overview of upcoming events and easy access to sign up.
# Persistent Data with Local Storage
- User sign-up data is saved using localStorage to persist entries across page reloads.
- Allows users to see their previous sign-ups even after refreshing the page.
# Form Validation
- Ensures that users enter necessary information (e.g., name, email, and event-specific details) before submitting the form.
- Provides feedback to users if required fields are missing.
# Dynamic Table Updates
- User entries are dynamically added to sign-up tables without page reloads.
- Includes features to delete entries, ensuring users can manage their sign-up information effectively.
# Unique Raffle Number Generation
- For the Raffle event, users can generate unique raffle numbers, ensuring no duplicates.
- Uses a set to track used numbers and stores them in localStorage for persistence.
# Event-Specific Customizations
- Each event page has unique customizations, such as different form fields and additional event information:
- Job Fair: Allows users to specify career interests.
- Raffle Event: Includes a random number generator for raffle ticket numbers.
- TedX Talk: Users can select a time slot for their attendance.
- Bake Sale: Users can specify the baked goods they will bring.
# Accessibility and User Experience Enhancements
- Navigation elements and form controls are designed with accessibility in mind, providing a better experience for all users.
- Includes descriptive alt text for images and appropriate labels for form fields.
# Responsive Design
- The layout adapts to different screen sizes, ensuring a consistent and user-friendly experience on both mobile and desktop devices.
