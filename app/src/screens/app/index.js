import { lazy } from 'react';

// Perform code-Splitting to enable lazy loading on frequently screens
export const Home = lazy(() => import('./Home'));
export const Details = lazy(() => import('./Details'));
export const SurveyDetails = lazy(() => import('./SurveyDetails'));
export const SurveyeeForm = lazy(() => import('./SurveyeeForm'));
export const Profile = lazy(() => import('./Profile'));
export const Notifications = lazy(() => import('./Notifications'));
