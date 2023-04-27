import React from 'react';
import MainNav from '../MainNav/MainNav';
import Links from '../../../components/Admin/Links/Links';

export default function SmallSidebar({
  isVisibleScrollBarSmallSidebar,
  setSsVisibleScrollBarSmallSidebar,
  user,
}) {
  return (
    <div
      onPointerEnter={() => setSsVisibleScrollBarSmallSidebar(true)}
      onPointerLeave={() => {
        setSsVisibleScrollBarSmallSidebar(false);
      }}
      className={
        isVisibleScrollBarSmallSidebar
          ? 'hidden md:block small-sidebar fixed z-[100] top-[52px] pt-[16px] px-2 pb-16 w-[120px] h-screen border-r border-r-slate-200 overflow-y-scroll visible-scrollbar'
          : `hidden md:block small-sidebar fixed z-[100] top-[52px] pt-[16px] px-2 pb-16 w-[120px] h-screen border-r border-r-slate-200 overflow-y-scroll`
      }
    >
      <div className="max-w-[96px]">
        {/** Admin links */}
        {user ? <Links direction="vertical" /> : null}
        {/** End admin links */}
        <MainNav direction="vertical" />
      </div>
    </div>
  );
}
