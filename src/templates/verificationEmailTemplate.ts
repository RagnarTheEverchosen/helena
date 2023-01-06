export function verifyEmail(ott: number) {
	const html = `
		<!DOCTYPE html>
		<html lang="en">

		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">

			<title>Dead center!</title>
			<style>
				body {
					margin: 0;
				}

				.main {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100vh;
					background-color: #fdfdfd;
					background: linear-gradient(135deg, #1f5da655 25%, transparent 25%) -40px 0/ 80px 80px, linear-gradient(225deg, #1f5da6 25%, transparent 25%) -40px 0/ 80px 80px, linear-gradient(315deg, #1f5da655 25%, transparent 25%) 0px 0/ 80px 80px, linear-gradient(45deg, #1f5da6 25%, #fdfdfd 25%) 0px 0/ 80px 80px;
				}

				.center {
					display: flex;
				}

				.aaa {
					background-color: #f2f3f9;
					box-shadow: 0 0 30px #ccc;
					height: 90%;
					width: 50%;
					flex-direction: column;
					justify-content: space-around;
				}

				.bbb {

					justify-content: center;
				}

				.ccc {
					justify-content: center;

					height: 63%;
				}

				.ddd {
					justify-content: center;
				}

				.xxx {
					background-color: white;
					box-shadow: 0 0 30px #ccc;
					border-radius: 10px;
					width: 85%;
					justify-content: space-between;
					display: flex;
					flex-direction: column;
				}

				.obrazek {
					height: 32%;
				}

				.second-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;
				}

				.token {
					justify-content: center;
					display: flex;
				}

				.token-number {
					width: 25%;
					font-size: 2em;
					line-height: 2em;
					justify-content: center;
					display: flex;
				}

				.text {
					text-align: center;
					margin-bottom: 2%;
				}
			</style>
		</head>

		<body>
			<div class="main">
				<div class="aaa center">
					<div class="ccc center">
						<div class="xxx">
							<div class="obrazek"><img class="second-image"
									src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Budova_Provozn%C4%9B_ekonomick%C3%A9_fakulty_Mendelovy_univerzity_v_Brn%C4%9B.jpg">
							</div>
							<div class="text">
								<h1>Your verification token</h1>
								<p>
									Welcome to community discord for PEF Mendelu.
								</p>
								<p>
									To get yourself verified, please use following token according to instructions the bot sent to you.
								</p>
							</div>
							<div class="token">
								<div class="token-number">${ott}</div>
							</div>
							<div class="text">
								If you did not associate your address with the MENDELU Discord server, please ignore this message.
							</div>
						</div>
					</div>
				</div>
			</div>

		</body>

		</html>
	`;

	const text = `
	
	`;

	return { html, text };
};