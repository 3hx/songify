const AnnouncementBanner = () => {
  return (
    <div className="bg-foreground">
      <div className="text-center">
        <div className="font-semibold text-background py-2 text-[13px] leading-none md:text-sm">
          {/* Show different text based on screen size */}
          <span className="md:hidden">LIMITED TIME: £25 OFF WITH SAVE25</span>
          <span className="hidden md:inline">
            LIMITED TIME: £25 OFF WITH SAVE25, £50 OFF ORDERS OF £325+ WITH
            SAVE50, OR £75 OFF ORDERS OF £425+ WITH SAVE75
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
