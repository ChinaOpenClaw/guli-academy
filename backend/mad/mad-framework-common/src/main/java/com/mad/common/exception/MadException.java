package com.mad.common.exception;

import com.mad.common.constants.ResultCodeEnum;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author helen
 * @since 2019/6/25
 */
@Data
@ApiModel(value = "自定义全局异常类")
public class MadException extends RuntimeException {

	@ApiModelProperty(value = "状态码")
	private Integer code;

	/**
	 * 接收状态码和错误消息
	 * @param code
	 * @param message
	 */
	public MadException(Integer code, String message){
		super(message);
		this.code = code;
	}

	public MadException(ResultCodeEnum resultCodeEnum){
		super(resultCodeEnum.getMessage());
		this.code = resultCodeEnum.getCode();
	}

	@Override
	public String toString() {
		return "MadException{" +
				"code=" + code +
				", message=" + this.getMessage() +
				'}';
	}
}
