import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

import ThingsToDoCard from "./../components/thingstodo-card";
import { Container, GridContainer } from "./../styled-components/Containers";
import Button from "./../styled-components/Button";
import { RowResponsive } from "./../styled-components/Responsive";
import { NavBarSide, NavBarTitle } from "./../components/navbar";
import ttdimg from "./../images/thingstodo.png";
import QuickExitButton from "./../components/exitButton";
import { useAppContext } from "../App";

export default function ThingsToDo(props) {
	const [thingsToDoData, setThingsToDoData] = useState();
	const { id } = useParams();
	const { setCountryName } = useAppContext();

	useEffect(() => {
		fetch(`https://tfb-bqtg.herokuapp.com/countries/${id}/things_to_do`)
			.then(result => result.json())
			.then(result => {
				setThingsToDoData(result);
				setCountryName(result[0].country_name);
			})
			.catch(error => error);
	}, [id]);

	const url = useLocation().pathname;
	return (
		<>
			<NavBarTitle />
			<QuickExitButton />
			<RowResponsive>
				<NavBarSide />
				<Container justify="center">
					<Link to={`${url}/sharethingstodo`}>
						<Button medialeft="0vw">Add Your own</Button>
					</Link>
				</Container>
				<GridContainer>
					{thingsToDoData ? (
						thingsToDoData.map(
							({ name, details, date_time, location, created_at, id }) => (
								<ThingsToDoCard
									key={id}
									src={ttdimg}
									name={name}
									details={details}
									date_time={date_time}
									location={location}
									created_at={created_at}
								/>
							),
						)
					) : (
						<h1>No Information Yet.....</h1>
					)}
				</GridContainer>
			</RowResponsive>
		</>
	);
}

/* <ThingsToDoCard
						src="https://cdn.dribbble.com/users/2417352/screenshots/11825923/media/ca572e930d5ccba2f5741f9d99076904.jpg"
						title="Skate Park"
					/>
					<ThingsToDoCard
						src="https://cdn.dribbble.com/users/2008861/screenshots/12574987/media/992d50513ab3b8190982085068459edd.jpg"
						title="Vegan Bakery"
					/>
					<ThingsToDoCard
						src="https://cdn.dribbble.com/users/2417352/screenshots/11932034/media/5eb8ac97aac3a5abb2cb4f3a489634a4.jpg"
						title="Dog Park"
					/>
					<ThingsToDoCard
						src="https://cdn.dribbble.com/users/164119/screenshots/11797758/media/127e7cd394600cfc24694a8280d3ee0a.jpg"
						title="Brazil Pride"
					/> */
