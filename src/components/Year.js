import EditCourse from './EditCourse';


function Year(){
    return(
        <div class="m-2 py-8 px-8 max-w-sm space-y-2 bg-white rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
        <div class="space-y-2 text-center sm:text-left">
            <div class="space-y-0.5">
            <p class="text-lg font-semibold text-black">Year</p>
            <div class="m-2 py-8 px-8 max-w-sm space-y-2 bg-white rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
                <div class="space-y-2 text-center sm:text-left">
                    <div class="space-y-0.5">
                    <p class="text-lg font-semibold text-black">Semester</p>
                    </div>
                    {/* <button class="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">
                    Add Course
                    </button> */}
                    <EditCourse/>
                </div>
                </div>
                <button class="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">
                    Add Semester
                </button>
            </div>
        </div>
        </div>
    )
}

export default Year;