package com.mad.edu.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mad.edu.entity.Subject;
import com.mad.edu.vo.SubjectVo2;

import java.util.List;

/**
 * <p>
 * 课程科目 Mapper 接口
 * </p>
 *
 * @author Helen
 * @since 2019-06-24
 */
public interface SubjectMapper extends BaseMapper<Subject> {

	List<SubjectVo2> selectNestedListByParentId(String parentId);
}
