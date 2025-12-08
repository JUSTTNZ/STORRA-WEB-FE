import PrefrenceOption from "../../components/dashboard/PrefrenceOption";

const preference = [
  {
    id: 0,
    label: "Quiz results",
    description: "Be the first to know how your child perform after each quiz.",
    options: [],
  },

  {
    id: 1,
    label: "Learning progress and milestones",
    description:
      "Track achievements like completed modules, badges and learning goals.",
  },
  {
    id: 2,
    label: "Wallet and Redemption Alerts",
    description:
      "Get notified when funds are added, rewards are redeemed or approvals are needed.",
  },
  {
    id: 3,
    label: "Weekly learning summary",
    description:
      "Receive a weekly report showing time spent, subject covered and progress made.",
  },
];

const notifications = [
  {
    id: 0,
    type: "Email",
    detail: "Get important updates sent directly to your email",
  },
  {
    id: 1,
    type: "SMS",
    detail: "Receive key alerts via text message, even when you’re offline",
  },
  {
    id: 2,
    type: "In-App",
    detail: "Get informed with real-time updates inside the Storra App",
  },
];

function NewPF() {
  return (
    <div>
      <PrefrenceOption notifications={notifications} preference={preference} />

      <div className="">
        {preference?.map((pref) => {
          return (
            <div
              key={pref.id}
              className={`${
                pref.id > 0 && "mt-6 pt-6 border-t-[1.5px] border-gray-50"
              } flex items-center gap-8 `}>
              <div className="flex h-[200px]">
                <div className=" flex flex-col w-[85%]">
                  <span className="text-[16px] font-medium text-[#131313]">
                    {pref.label}
                  </span>
                  <p className="text-[#5A5F6B] ">{pref.description}</p>
                </div>
              </div>
              <div className=" flex flex-col gap-1.5 h-[200px]">
                {notifications.map((notis) => {
                  return (
                    <>
                      <div className="w-[75%]" key={notis.id}>
                        <span className="font-medium text-[#131313] text-[14px] flex gap-2">
                          {/* <input
                          type="checkbox"
                          name=""
                          id={notis.id}
                          value={notis?.type}
                          className="rounded-full  "
                          onClick={(e) => shangeOption(e.target.value)}
                        />{" "} */}
                          <Checkbox
                            value={notis?.type + pref.label}
                            checked={selectedOptions.includes(
                              notis?.type + pref.label
                            )}
                            onChange={(e) => changeOption(e.target.value)}
                          />

                          {notis?.type}
                        </span>
                        <p className="text-sm text-[#5A5F6B]">
                          {notis?.detail}
                        </p>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-[40vh] overflow-hidden bg-amber-950">
        <div className="flex  max-h-[300px]">
          <div className="text-[26px] font-bold  text-[#131313] pb-4 h-">
            Notification Preferences
            <p className=" text-sm font-thin text-gray-600">
              Set your notification preference
            </p>
          </div>
          <div className="">
            {preference?.map((pref) => {
              return (
                <div
                  key={pref.id}
                  className={`${
                    pref.id > 0 && "mt-6 pt-6 border-t-[1.5px] border-gray-50"
                  } flex items-center gap-8 `}>
                  <div className="flex h-[200px]">
                    <div className=" flex flex-col w-[85%]">
                      <span className="text-[16px] font-medium text-[#131313]">
                        {pref.label}
                      </span>
                      <p className="text-[#5A5F6B] ">{pref.description}</p>
                    </div>
                  </div>
                  <div className=" flex flex-col gap-1.5 h-[200px]">
                    {notifications.map((notis) => {
                      return (
                        <>
                          <div className="w-[75%]" key={notis.id}>
                            <h2 className="font-medium text-[#131313] text-[14px] flex gap-2">
                              <Checkbox
                                value={notis?.type + pref.label}
                                checked={selectedOptions.includes(
                                  notis?.type + pref.label
                                )}
                                onChange={(e) => changeOption(e.target.value)}
                              />

                              {notis?.type}
                            </h2>
                            <p className="text-sm text-[#5A5F6B]">
                              {notis?.detail}
                            </p>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPF;
