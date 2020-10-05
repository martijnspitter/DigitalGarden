import React from 'react';

import { Container, Card } from 'react-bootstrap';

export default function Documentation() {
	return (
		<Container style={{ display: 'flex', justifyContent: 'center', margin: '4rem 0' }}>
			<Card style={{ width: '100%' }}>
				<Card.Header
					style={{ display: 'flex', justifyContent: 'center', color: '#E76F51', backgroundColor: '#264653' }}
				>
					Digital Garden Documentation
				</Card.Header>
				<Card.Body style={{ padding: '2rem 4rem' }}>
					<section>
						<h2 style={{ marginBottom: '2rem' }}>Introduction</h2>
						<h4 style={{ marginBottom: '1rem' }}>Welcome on the Digital Garden!</h4>
						<p>
							This Digital Garden was created to fill up my portfolio and to learn more about Recoil and get more
							familiar with Bootstrap, NodeJS (with Express) and MySQL. And learn a lot I did! I am happy with the
							result and I hope you are too!
						</p>

						<h4 style={{ marginBottom: '1rem' }}>Greeting Martijn </h4>
					</section>

					<section style={{ marginTop: '2rem' }}>
						<h2 style={{ marginBottom: '2rem' }}>Recoil</h2>
						<p>
							Recoil is a new state management library designed exclusively for React. For now it's still experimental
							but the functionality is there. Redux is widely known and used but I expect that Recoil will replace Redux
							on a lot of projects going forward. Mainly because it integrates so well with React and it requires very
							little boilerplate code. The learning curve is also much lower with Recoil opposed to Redux. No connect
							function. No mapStateToProps function. Just import the atom en use it like you would any hook.
						</p>
					</section>

					<section style={{ marginTop: '2rem' }}>
						<h2 style={{ marginBottom: '2rem' }}>Functionality of this site</h2>
						<p>
							This Digital Garden is very simple in design. It has this documentation page. The Home page where you see
							a list of all the posts. You can sort these posts on the progress of each post. And you can filter the
							posts on the tags it has. Click on a post and you will see the post. There are walled off sections behind
							a login page to create, edit and delete posts and tags. All of these pages use Recoil to store the fetched
							data and mutate the data when neccesary. If you want to take a look at the source code you can go to my{' '}
							<a href="https://github.com/martijnspitter/DigitalGarden" target="_blank" rel="noopener noreferrer">
								Github Page
							</a>
						</p>
					</section>
				</Card.Body>
			</Card>
		</Container>
	);
}
