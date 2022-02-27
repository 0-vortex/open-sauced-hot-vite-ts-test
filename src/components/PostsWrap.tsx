import React, { useState, useEffect } from 'react';
import LayoutToggle from './LayoutToggle';
import Modal from './Modal';
import SecondaryNav from './SecondaryNav';
// import GridDisplay from './GridDisplay.jsx';
// import ListDisplay from './ListDisplay.jsx';
// import { authenticatedRecommendation, fetchRecommendations, fetchMyVotes } from '../lib/database';
import useSupabaseAuth from '../hooks/useSupabaseAuth';

const PostsWrap = (): JSX.Element => {
  const [isGrid, setIsGrid] = useState(true);
  const [activeLink, setActiveLink] = useState<string | null>('popular');
  const [fetchedData, setFetchedData] = useState([]);
  const [limit, setLimit] = useState(25);
  const { user } = useSupabaseAuth();

  return (
    <>
      <Modal/>
      <SecondaryNav
        setLimit={setLimit}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        user={user}
      />
      <LayoutToggle gridState={isGrid} setGridState={setIsGrid} />
    </>
  );
};

export default PostsWrap;
