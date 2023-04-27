import React, { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useLocation } from 'react-router-dom';

import Toolbar from '../components/Toolbar';
import * as api from '../api/categories';
import { countPosts } from '../api/posts';
import LargeSidebar from './Sidebars/LargeSidebar/LargeSidebar';
import SmallSidebar from './Sidebars/SmallSidebar/SmallSidebar';
import userAPI from '../utils/user';

export async function loader() {
  const categories = await api.getCategories();
  const countPost = await countPosts();
  const user = userAPI.checkAdmin();

  return { categories, countPost, user };
}

export default function Root() {
  const { categories, countPost, user } = useLoaderData();
  const [isWideSidebar, setIsWideSidebar] = useState(true);
  const [isVisibleScrollBar, setIsVisibleScrollbar] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [isVisibleScrollBarSmallSidebar, setSsVisibleScrollBarSmallSidebar] =
    useState(false);
  const location = useLocation();

  useEffect(() => {
    userAPI.checkTokenExpirationTime();
  }, [location]);

  return (
    <div className="">
      <Toolbar
        user={user}
        handleSidebar={setIsWideSidebar}
        handleToggle={setToggleSidebar}
      />
      <div
        className="content flex flex-nowrap justify-start max-w-full"
        onClick={() => setToggleSidebar(false)}
      >
        {/** small screens - < md */}
        {toggleSidebar ? (
          <LargeSidebar
            isVisibleScrollBar={isVisibleScrollBar}
            setIsVisibleScrollbar={setIsVisibleScrollbar}
            items={categories}
            countPost={countPost}
            smallScreen
            user={user}
          />
        ) : null}

        {/** SIDEBAR */}
        {isWideSidebar ? (
          <LargeSidebar
            isVisibleScrollBar={isVisibleScrollBar}
            setIsVisibleScrollbar={setIsVisibleScrollbar}
            items={categories}
            countPost={countPost}
            user={user}
          />
        ) : (
          <SmallSidebar
            isVisibleScrollBarSmallSidebar={isVisibleScrollBarSmallSidebar}
            setSsVisibleScrollBarSmallSidebar={
              setSsVisibleScrollBarSmallSidebar
            }
            user={user}
          />
        )}
        {/** CONTENT */}
        <div
          // ref={ref}
          className={`page-content flex-grow min-h-screen ${
            isWideSidebar ? 'md:ml-[320px]' : 'md:ml-[120px]'
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
