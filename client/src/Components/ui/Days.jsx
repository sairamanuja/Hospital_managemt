export function Days() {
    return (
        <div className="">
            <DayCard day="tuesday" date="10" />
            <TimeSlot time="start-time - endtime" />
        </div>
    )
}


export const DayCard = ({ day, date, isSelected, onClick }) => {
  return (
    <div
      className={`p-4 border rounded-lg shadow-md cursor-pointer ${
        isSelected ? 'bg-blue-100' : 'bg-white'
      }`}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold">{day}</h3>
      <p className="text-sm text-gray-600">{date}</p>
    </div>
  );
};

const formatTime = (time) => {
    // Split the time into hours and minutes
    const [hours, minutes] = time.split(':');
    // Convert to 12-hour format with AM/PM
    const formattedTime = new Date(0, 0, 0, hours, minutes).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return formattedTime;
  };

  export const TimeSlot = ({ starttime, endtime, isSelected, onClick, isBooked }) => {
    const formattedStartTime = formatTime(starttime); 
    const formattedEndTime = formatTime(endtime); 
  
    return (
      <div
        className={`p-2 border rounded-lg shadow-sm cursor-pointer ${
          isSelected
            ? 'bg-blue-100 border-blue-500' // Selected state
            : isBooked
            ? 'bg-gray-200 cursor-not-allowed' // Booked state
            : 'bg-white hover:bg-gray-50' // Default state
        }`}
        onClick={!isBooked ? onClick : undefined} // Disable click if booked
      >
        <p className="text-sm">
          {formattedStartTime} - {formattedEndTime}
        </p>
      </div>
    );
  };