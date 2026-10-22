package com.mad.ucenter.controller.admin;

import com.mad.common.vo.R;
import com.mad.ucenter.service.MemberService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author helen
 * @since 2019/7/1
 */
@CrossOrigin
@RestController
@RequestMapping("/admin/ucenter/member")
public class MemberAdminController {

	@Autowired
	private MemberService memberService;

	@ApiOperation(value = "今日注册数")
	@GetMapping(value = "count-register/{day}")
	public R registerCount(
			@ApiParam(name = "day", value = "统计日期")
			@PathVariable String day){

		Integer count = memberService.countRegisterByDay(day);

		return R.ok().data("countRegister", count);
	}
}
