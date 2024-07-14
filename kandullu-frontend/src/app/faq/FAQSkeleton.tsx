const RenderSkeleton = () => {
  return (
    <div className="mt-4 flex">
      <div>
        <div className="flex items-center h-16 border-l-4 border-primary-800">
          <div className="bg-gray-200 animate-pulse w-10 h-10 ml-4"></div>
        </div>
        <div className="flex items-center h-16 border-l-4 border-gray-400">
          <div className="bg-gray-200 animate-pulse w-10 h-10 ml-4"></div>
        </div>
      </div>
      <div className="ml-4 w-full">
        <div className="flex items-center h-16">
          <div className="bg-gray-200 animate-pulse w-2/3 h-6"></div>
        </div>
        <div className="flex items-center py-2">
          <div className="bg-gray-200 animate-pulse w-full h-6"></div>
        </div>
      </div>
    </div>
  );
};
export default RenderSkeleton;
