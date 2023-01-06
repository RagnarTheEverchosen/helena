
export class Logger {

	// Log a message at the specified level
	private static log(level: string, primaryMessage: string, ...supportingData: any[]) {
	
		const timestamp = new Date().toISOString();

	  	// If supporting data is provided, log it along with the message
	  	if (supportingData.length > 0) {
			console.log(`[${level}][${timestamp}] ${primaryMessage}`, supportingData);
	  	} else {
			// Otherwise, just log the message
			console.log(`[${level}][${timestamp}] ${primaryMessage}`);
	  	}
	}
	
	// Log a debug message
	public static debug(primaryMessage: string, ...supportingData: any[]) {
	  	this.log('DEBUG', primaryMessage, ...supportingData);
	}
  
	// Log a warning message
	public static warn(primaryMessage: string, ...supportingData: any[]) {
	  	this.log('WARNING', primaryMessage, ...supportingData);
	}
  
	// Log an error message
	public static error(primaryMessage: string, ...supportingData: any[]) {
	  	this.log('ERROR', primaryMessage, ...supportingData);
	}
  
	// Log an info message
	public static info(primaryMessage: string, ...supportingData: any[]) {
	  	this.log('INFO', primaryMessage, ...supportingData);
	}

  }