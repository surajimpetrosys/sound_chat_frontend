import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-outline';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-outline';
import fileTextFill from '@iconify/icons-eva/file-text-outline';
import lockFill from '@iconify/icons-eva/lock-outline';
import personAddFill from '@iconify/icons-eva/person-add-outline';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-outline';
import videoFill from '@iconify/icons-eva/video-outline';
import tvFill from '@iconify/icons-eva/tv-outline';
import radioOutline from '@iconify/icons-eva/radio-outline';
import filmOutline from '@iconify/icons-eva/film-outline';
import musicOutline from '@iconify/icons-eva/music-outline';
import activityOutline from '@iconify/icons-eva/activity-outline';
import filmFill from '@iconify/icons-eva/film-fill';
import questionmarkcircleoutline from '@iconify/icons-eva/question-mark-circle-outline';
import archiveoutline from '@iconify/icons-eva/archive-outline';
import layersoutline from '@iconify/icons-eva/layers-outline';
import calendaroutline from '@iconify/icons-eva/calendar-outline';
import headphonesoutline from '@iconify/icons-eva/headphones-outline';




// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'interview',
    path: '/dashboard/interview',
    icon: getIcon(videoFill)
  },
  {
    title: 'Phone interview',
    path: '/dashboard/phoneinterview',
    icon: getIcon(headphonesoutline)
  },
  {
    title: 'shows',
    path: '/dashboard/shows',
    icon: getIcon(tvFill)
  },
  {
    title: 'gallery',
    path: '/dashboard/gallery',
    icon: getIcon(filmOutline)
  },

  // {
  //   title: 'radio podcast',
  //   path: '/dashboard/radio-podcast',
  //   icon: getIcon(radioOutline)
  // },

  // {
  //   title: 'music album',
  //   path: '/dashboard/music-album',
  //   icon: getIcon(musicOutline)
  // },

  {
    title: 'Live Content',
    path: '/dashboard/livecontent',
    icon: getIcon(activityOutline)
  },

  {
    title: 'banner',
    path: '/dashboard/banner',
    icon: getIcon(calendaroutline)
  },

  {
    title: 'home slider',
    path: '/dashboard/homeslider',
    icon: getIcon(layersoutline)
  },

  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Product Order',
    path: '/dashboard/productorder',
    icon: getIcon(archiveoutline)
  },
  {
    title: 'Query List',
    path: '/dashboard/query',
    icon: getIcon(questionmarkcircleoutline)
  },
  {
    title: 'Ads Query List',
    path: '/dashboard/adsquery',
    icon: getIcon(questionmarkcircleoutline)
  },
  
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill)
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
