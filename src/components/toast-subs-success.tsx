const ToastSubsSuccess = (t: { visible: boolean }) => (
  <div
    className={`${t.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex w-[343px] flex-row items-center rounded-full bg-green-50 md:w-[499px]`}
  >
    <div className='flex items-center gap-3 py-1 pl-1 pr-[10px]'>
      <p className='rounded-full bg-white px-[10px] py-[2px] text-sm font-medium text-green-700'>
        Success
      </p>
      <p className='text-sm font-medium text-green-700'>
        Subscription successful! Please check your email to confirm.
      </p>
    </div>
  </div>
);

export default ToastSubsSuccess;
