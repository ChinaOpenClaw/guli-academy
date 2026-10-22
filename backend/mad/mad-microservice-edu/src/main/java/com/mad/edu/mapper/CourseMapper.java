package com.mad.edu.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mad.edu.entity.Course;
import com.mad.edu.vo.CoursePublishVo;
import com.mad.edu.vo.CourseWebVo;

/**
 * <p>
 * 课程 Mapper 接口
 * </p>
 *
 * @author Helen
 * @since 2019-06-24
 */
public interface CourseMapper extends BaseMapper<Course> {

	CoursePublishVo selectCoursePublishVoById(String id);

	CourseWebVo selectCourseWebVoById(String courseId);
}
