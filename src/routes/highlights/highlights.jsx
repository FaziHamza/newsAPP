import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
const highlightsData = [
    {
        "title": "Manchester City - Newcastle United",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359239/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359239.jpeg",
        "date": "2023-08-19T19:00:00+0000",
        "videos": [
            {
                "id": "64e14c802bdef",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/cU80RGp1Q2tQQ053d3RydlR3YmlSUT09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Tottenham Hotspur - Manchester United",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359240/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359240.jpeg",
        "date": "2023-08-19T16:30:00+0000",
        "videos": [
            {
                "id": "64e18066816d3",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/b3Q3cFpEK3lOU1IwZUxDZms0aXZPUT09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            },
            {
                "id": "64e132110ff98",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/dXZJdDBIRU1CNzhadkF5cmtrRkpXZz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Wolves - Brighton",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359242/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359242.jpeg",
        "date": "2023-08-19T14:00:00+0000",
        "videos": [
            {
                "id": "64e1395c5f661",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/bUtPekRJT3RiYjA0dlkvYUdIazFTZz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            },
            {
                "id": "64e0ff4f4dec6",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/elkzT0N1c3NVYkRzajNNcTZOU3Rmdz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Fulham - Brentford",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359237/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359237.jpeg",
        "date": "2023-08-19T14:00:00+0000",
        "videos": [
            {
                "id": "64e12e14b7b6a",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/QjBnQ0E1cWtacDlCeFAxaG5NN2JXdz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Liverpool - Bournemouth",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359238/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359238.jpeg",
        "date": "2023-08-19T14:00:00+0000",
        "videos": [
            {
                "id": "64e13a2d4ea49",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/eVpYcnlqTjByZ2lBRFNKVU56WGJYUT09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            },
            {
                "id": "64e12dc9b420e",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/c091Q2JNZCtiYXNVN01RQ3JEanR2Zz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Nottingham Forest - Sheffield United",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359125/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359125.jpeg",
        "date": "2023-08-18T18:45:00+0000",
        "videos": [
            {
                "id": "64e04f3f58780",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/bXloUmk5dWRPeTRqazJYYzNhTVpIZz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Manchester United - Wolves",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359234/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359234.jpeg",
        "date": "2023-08-14T19:00:00+0000",
        "videos": [
            {
                "id": "64db0042dc45f",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/UDdiLzlVS1lOaDhLaVBlWGNqVGZxZz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            },
            {
                "id": "64dab43417a91",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/N3czdE5wMWRST1dES3hVRjNGVXYwUT09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Chelsea - Liverpool",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359233/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359233.jpeg",
        "date": "2023-08-13T15:30:00+0000",
        "videos": [
            {
                "id": "64d9b09a95407",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/NUFHemd1NWoxM2YzNHJqVE9MR05oQT09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Brentford - Tottenham Hotspur",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359232/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359232.jpeg",
        "date": "2023-08-13T13:00:00+0000",
        "videos": [
            {
                "id": "64d9b6c75ea12",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/QmxNZ1hoaWRRY0pGeFZrU3pGbFRDZz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            },
            {
                "id": "64d9b68d1db69",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/UHQyUXFjL2kwaTVFNnQ0bmtOUlZZdz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Newcastle United - Aston Villa",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359231/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359231.jpeg",
        "date": "2023-08-12T16:30:00+0000",
        "videos": [
            {
                "id": "64d846018fcae",
                "title": "Extended Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/dzVjNW92TG1oTUVpZlVyM09BcjE3UT09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            },
            {
                "id": "64d7f36da43e3",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/bGYvZGREVGEweXozUGJ3cWJHMFpMZz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Brighton - Luton",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359122/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359122.jpeg",
        "date": "2023-08-12T14:00:00+0000",
        "videos": [
            {
                "id": "64d8459c4ee21",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/QlhXcmxlaTFoaDYvUWgyZkM0YmVTdz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            },
            {
                "id": "64d7c3c5184c3",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/djEzTm9jaEFneVltTkFSYkN5T3VtZz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Everton - Fulham",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359230/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359230.jpeg",
        "date": "2023-08-12T14:00:00+0000",
        "videos": [
            {
                "id": "64d7f4d5c9ae8",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/a3NoK2kwN3FleTMvNStLdEFJekpOdz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Bournemouth - West Ham United",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359229/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359229.jpeg",
        "date": "2023-08-12T14:00:00+0000",
        "videos": [
            {
                "id": "64d7e5e36aedf",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/bC93Zk1DOGd0MVVGRi9sR0dVNVFUQT09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Sheffield United - Crystal Palace",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359123/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359123.jpeg",
        "date": "2023-08-12T14:00:00+0000",
        "videos": [
            {
                "id": "64d845b431169",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/R2lPazB1MXVEdHNaT3pRN0c2T2VBUT09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            },
            {
                "id": "64d7f69808ae5",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/cGhzRlJINjJOOVp5aStoUkZRdTFDUT09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Arsenal - Nottingham Forest",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359035/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359035.jpeg",
        "date": "2023-08-12T12:00:00+0000",
        "videos": [
            {
                "id": "64d7f3409d810",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/aGlzbHhyV2hBTUx3UGhPLzE3OGF4QT09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Burnley - Manchester City",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1359034/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1359034.jpeg",
        "date": "2023-08-11T19:00:00+0000",
        "videos": [
            {
                "id": "64d6bf2639e7b",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/b3V6REtRbno4RHZvQnRUdHZkS3RXZz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Chelsea - Newcastle United",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1197912/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1197912.jpeg",
        "date": "2023-05-28T15:30:00+0000",
        "videos": [
            {
                "id": "6473c101c9c06",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/ckdMZFM1ZFllQ1g3Z2RwVmRjV0lTZz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Leicester City - West Ham United",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1197916/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1197916.jpeg",
        "date": "2023-05-28T15:30:00+0000",
        "videos": [
            {
                "id": "6473c11fcc44f",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/U28wN2JVMkRtcXAvdUUrenRRdkpidz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Aston Villa - Brighton",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1197910/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1197910.jpeg",
        "date": "2023-05-28T15:30:00+0000",
        "videos": [
            {
                "id": "64739942d4800",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/VmtmYzlIN1lCWCtKeDFPREhZbk5jUT09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            },
            {
                "id": "64739942d4e28",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/UG9xTTZHRU9BNG1aV0pOaC8zVXEzUT09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    },
    {
        "title": "Arsenal - Wolves",
        "competition": "ENGLAND: Premier League",
        "matchviewUrl": "https://www.scorebat.com/embed/matchview/1197909/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "competitionUrl": "https://www.scorebat.com/embed/competition/england-premier-league/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw",
        "thumbnail": "https://www.scorebat.com/og/m/og1197909.jpeg",
        "date": "2023-05-28T15:30:00+0000",
        "videos": [
            {
                "id": "6473c44a34c1e",
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;background:#000;'><iframe src='https://www.scorebat.com/embed/v/NHR0TGtlbHFaQVhNOG5YNk5lVmpIZz09/?token=ODE3NDNfMTY5MjUzODY3MF9mMGQxYjAwZDNkNzU3MGMyNWZmYmVlMzQ2NjcxYWI4YWVkZmY0Yzgw&utm_source=api&utm_medium=video&utm_campaign=apicm' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    }
]
const HighlightsList = () => {
    const [showModal, setShowModal] = useState(false);
    const [videoEmbed, setVideoEmbed] = useState('');

    const [mathInfoEmbed, setMathInfoEmbed] = useState(null);
    const [showMathInfoModal, setShowMathInfoModal] = useState(false);


    const handleMathInfoClick = (url) => {
        setMathInfoEmbed(url);
        setShowMathInfoModal(true);
    };


    const location = useLocation();
    const { state } = location;
    const handleVideoClick = (embedCode) => {
        setVideoEmbed(embedCode);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setVideoEmbed('');
    };
    const SubTopicId = state?.subtopicId;
    const TopicId = state?.topicId;
    return (
        <div className="layout">
            <div className="main-card-section">

                <div className="main-card">
                    <div className="header">
                        <div>
                            <img src="assets/images/22.png" alt="" />
                            <span>TOPIC : {TopicId}</span>
                        </div>
                        <div>
                            <img src="assets/images/22.png" alt="" />
                            <span>SUBTOPIC : {SubTopicId} </span>
                        </div>

                    </div>
                    <div className="video-banner" style={{ backgroundImage: `url(${highlightsData[0]?.thumbnail})` }} onClick={() => handleVideoClick(highlightsData[0]?.videos[0]?.embed)}>
                        <i className="fa-solid fa-circle-play"></i>
                    </div>
                    <div className="content">
                        <h5>
                            {highlightsData[0]?.title}
                        </h5>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleMathInfoClick(highlightsData[0]?.matchviewUrl); }}>MATH INFO</a>
                        <small>{new Date(highlightsData[0]?.date).toLocaleString()}</small>
                    </div>
                    {showMathInfoModal && (
                        <div className="modal">
                            <div className="modal-content modal-content-more">
                            <button onClick={() => { console.log("Close button clicked"); setShowMathInfoModal(false); }} className="close-button">X</button>
                                <iframe src={mathInfoEmbed} width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <div className="secondary-card-section">
                {highlightsData.slice(1).map((highlight, index) => (
                    <div key={index} className="secondary-card">
                        <div className="video-banner" style={{ backgroundImage: `url(${highlight.thumbnail})` }} onClick={() => handleVideoClick(highlight.videos[0]?.embed)}>
                            <i className="fa-solid fa-circle-play"></i>
                        </div>
                        <div className="content">
                            <h5>
                                {highlight.title}
                            </h5>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleMathInfoClick(highlight?.matchviewUrl); }}>MATH INFO</a>

                            {/* <a href={highlight.competitionUrl}>MATH INFO</a> */}
                            <small>{new Date(highlight.date).toLocaleString()}</small>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <button onClick={handleCloseModal} className="close-button">X</button>
                        <div className="video-wrapper" dangerouslySetInnerHTML={{ __html: videoEmbed }} />
                    </div>
                </div>
            )}
        </div>

    );

};

export default HighlightsList;